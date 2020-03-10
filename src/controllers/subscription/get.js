const Subscription = require('../../models/Subscription');
const Handlers = require('../../utils/handlers');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const _id = req.params.id;
		const subscription = await Subscription.findById(_id).populate('company', [
			'name',
			'photo',
		]);
		if (!subscription)
			throw createError(404, 'No subscription found with this id');
		Handlers.success(res, 200, subscription, null);
	} catch (e) {
		Handlers.error(res, e, 'getSubscription');
	}
};
