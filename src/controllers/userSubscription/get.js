const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const UserSubscription = require('../../models/UserSubscription');

// RETURN HOW MUCH STUFF IS LEFT

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const subscriptions = await UserSubscription.find({
			userId: _id,
			active: true,
		})
			.populate('subscription')
			.populate('company');
		Handlers.success(res, 200, { subscriptions }, null);
	} catch (e) {
		Handlers.error(res, e, 'getUserSubscriptions');
	}
};
