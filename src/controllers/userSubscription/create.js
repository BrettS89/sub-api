const Subscription = require('../../models/Subscription');
const UserSubscription = require('../../models/UserSubscription');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');
const userSubService = require('../../services/userSubscription');
const addCredits = require('../../utils/addCredits');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const { subscriptionId } = req.body;
		const subscription = await Subscription.findById(subscriptionId);
		const userSubscription = await UserSubscription.find({
			user: _id,
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
		req.body.subscription = subscription._id;
		req.body.userId = _id;
		req.body.price = subscription.price;
		req.body.company = subscription.company;
		req.body.active = true;
		req.body.billingFrequency = subscription.billingFrequency;
		req.body.billOn =
			req.body.billingFrequency === 'weekly'
				? new Date().toString().split(' ')[0]
				: new Date().toString().split(' ')[2];

		if (req.body.billingFrequency === 'monthly' && Number(req.body.billOn) > 28)
			req.body.billOn === '28';

		const createdSubscription = await userSubService
			.createUserSubscription(req.body)
			.save();

		/*
				BILL USERS HERE
		*/

		await addCredits(_id, subscription, createdSubscription._id);
		Handlers.success(res, 201, { userSubscription: createdSubscription }, null);
	} catch (e) {
		Handlers.error(res, e, 'createUserSubscription');
	}
};
