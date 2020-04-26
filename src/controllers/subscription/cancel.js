const Subscription = require('../../models/Subscription');
const UserSubscription = require('../../models/UserSubscription');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const { id } = req.params;
		const subscription = await Subscription.findById(id);
		if (!subscription)
			throw createError(404, 'No subscription found with this id');
		subscription.active = false;
		await subscription.save();
		await UserSubscription.update(
			{ subscription: subscription._id },
			{ cancelledBySpot: true },
			{ multi: true }
		);
		Handlers.success(res, 200, { message: 'Subscription cancelled' });
	} catch (e) {
		Handlers.error(res, e, 'cancelSubscription');
	}
};
