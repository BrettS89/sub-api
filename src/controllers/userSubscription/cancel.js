const UserSubscription = require('../../models/UserSubscription');
const Credit = require('../../models/Credit');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');
const userSubService = require('../../services/userSubscription');
const mixpanel = require('../../utils/mixpanel');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const userSubscriptionId = req.params.id;
		const userSubscription = (
			await UserSubscription.find({
				_id: userSubscriptionId,
				userId: _id,
			})
		)[0];
		if (!userSubscription)
			throw createError(404, 'No subscription found with this id');
		userSubscription.active = false;
		await userSubscription.save();
		await Credit.remove({ userSubscription: userSubscription._id });
		Handlers.success(
			res,
			201,
			{ message: 'subscription cancelled', _id: userSubscriptionId },
			null
		);
		mixpanel.track('cancel subscription', {
			distinct_id: _id,
		});
	} catch (e) {
		Handlers.error(res, e, 'createUserSubscription');
	}
};
