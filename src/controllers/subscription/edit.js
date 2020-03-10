const Subscription = require('../../models/Subscription');
const Handlers = require('../../utils/handlers');
const adminAuth = require('../../utils/adminAuth');
const subService = require('../../services/subscription');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		await adminAuth(req.header('authorization'));
		const { id, plan, key, value } = req.body;
		const subscription = await Subscription.findById(id);
		if (!subscription) throw createError('No subscription found with this id');
		subscription[plan][key] = value;
		const updatedSubscription = await subscription.save();
		Handlers.success(res, 200, updatedSubscription, null);
	} catch (e) {
		Handlers.error(res, e, 'createSubscription');
	}
};
