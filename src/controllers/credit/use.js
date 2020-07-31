const Credit = require('../../models/Credit');
const UserSubscription = require('../../models/UserSubscription');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const { itemId, userSubscriptionId } = req.body;
		const promiseArr = [
			UserSubscription.findById(userSubscriptionId),
			Credit.findOne({
				used: false,
				user: _id,
				item: itemId,
			}),
		];
		const [userSubscription, credit] = await Promise.all(promiseArr);
		if (!credit) throw createError('Invalid credit');
		credit.used = true;
		await credit.save();

		if (userSubscription.cancelledBySpot) {
			const creditsArr = await Credit.find({
				userSubscription: userSubscription._id,
				used: false,
			});

			if (!creditsArr.length) {
				// cancel subscription
				userSubscription.active = false;
				const promiseArr2 = [
					userSubscription.save(),
					Credit.remove({ userSubscription: userSubscription._id }),
				];
				await Promise.all(promiseArr2);
			}
		}

		Handlers.success(res, 200, { itemId });
	} catch (e) {
		Handlers.error(res, e, 'useCredit');
	}
};
