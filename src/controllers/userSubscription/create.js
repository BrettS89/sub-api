const keys = require('../../config');
const Subscription = require('../../models/Subscription');
const User = require('../../models/User');
const Company = require('../../models/Company');
const UserSubscription = require('../../models/UserSubscription');
const Invoice = require('../../models/Invoice');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');
const userSubService = require('../../services/userSubscription');
const addCredits = require('../../utils/addCredits');
const stripe = require('../../utils/stripe');
const mixpanel = require('../../utils/mixpanel');
const twilio = require('../../utils/twilio');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const { subscriptionId } = req.body;
		const promiseArr = [
			User.findById(_id),
			Subscription.findById(subscriptionId),
		];
		const [user, subscription] = await Promise.all(promiseArr);
		const company = await Company.findById(subscription.company);
		const userSubscription = await UserSubscription.find({
			userId: _id,
			company: subscription.company,
			active: true,
		});
		if (userSubscription.length)
			throw createError(
				400,
				'You already have a subscription with this company'
			);
		if (!subscription)
			throw createError(404, 'No subscription found with this id');
		req.body.lastName = user.lastName;
		req.body.subscription = subscription._id;
		req.body.userId = _id;
		req.body.price = subscription.price;
		req.body.company = subscription.company;
		req.body.active = true;
		req.body.billingFrequency = subscription.billingFrequency;
		req.body.billOn =
			req.body.billingFrequency === 'week'
				? new Date().toString().split(' ')[0]
				: new Date().toString().split(' ')[2];

		if (req.body.billingFrequency === 'month' && Number(req.body.billOn) > 28)
			req.body.billOn === '28';

		// BILLS CUSTOMER OR PARADYSE:
		let charged = null;
		if (user.firstSubscription) {
			await stripe.billUser(
				subscription.price,
				keys.internalStripeId,
				company.stripeId,
				company._id
			);
			user.firstSubscription = false;
			await user.save();
			charged = 0;
		} else {
			await stripe.billUser(
				subscription.price,
				user.stripeId,
				company.stripeId,
				company._id
			);
			charged = subscription.price;
		}

		const createdSubscription = await userSubService
			.createUserSubscription(req.body)
			.save();

		await addCredits(_id, subscription, createdSubscription._id);
		const invoice = new Invoice({
			user: user._id,
			company: company._id,
			subscription: subscription._id,
			userSubscription: createdSubscription._id,
			price: subscription.price,
			charged,
		});
		await invoice.save();
		createdSubscription.subscription = subscription;
		createdSubscription.company = company;
		twilio.notifyMe('A user purchased a subscription!');
		Handlers.success(res, 201, { userSubscription: createdSubscription }, null);
		mixpanel.track('user subscribed', {
			distinct_id: user._id,
		});
	} catch (e) {
		Handlers.error(res, e, 'createUserSubscription');
	}
};
