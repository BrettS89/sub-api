const Company = require('../../models/Company');
const Subscription = require('../../models/Subscription');
const UserSubscription = require('../../models/UserSubscription');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const { id } = req.params;
		const foundCompany = await Company.findById(company);
		foundCompany.subscriptions = foundCompany.subscriptions - 1;
		const subscription = await Subscription.findById(id);
		if (!subscription)
			throw createError(404, 'No subscription found with this id');
		subscription.active = false;
		const promiseArr = [
			subscription.save(),
			foundCompany.save(),
			UserSubscription.update(
				{ subscription: subscription._id },
				{ cancelledBySpot: true },
				{ multi: true }
			),
		];
		await Promise.all(promiseArr);
		Handlers.success(res, 200, { message: 'Subscription cancelled' });
	} catch (e) {
		Handlers.error(res, e, 'cancelSubscription');
	}
};
