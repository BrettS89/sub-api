const Credit = require('../../models/Credit');
const UserSubscription = require('../../models/UserSubscription');
const Item = require('../../models/Item');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		console.log(req.body);
		const { _id } = await userAuth(req.header('authorization'));
		const promiseArr = [
			Credit.find({
				used: false,
				user: _id,
			})
				.populate('subscription', ['name', 'photo'])
				.populate('item')
				.populate('company', ['name']),
			UserSubscription.find({
				userId: _id,
				active: true,
			})
				.populate('subscription')
				.populate('company', ['name']),
		];

		let [credits, userSubscriptions] = await Promise.all(promiseArr);

		// Check spotCancelledSubscriptions
		const subsToRemove = [];
		const spotsToCancel = [];
		const userSubCredits = credits.map((c) => c.userSubscription.toString());
		userSubscriptions.forEach((s) => {
			if (s.cancelledBySpot && !userSubCredits.includes(s._id.toString())) {
				// cancel subscription
				s.active = false;
				subsToRemove.push(s.save());
				subsToRemove.push(s._id);
			}
		});

		await Promise.all(spotsToCancel);

		userSubscriptions = userSubscriptions.filter(
			(s) => !subsToRemove.includes(s._id)
		);
		// End spot cancelled flow

		const companies = userSubscriptions.map((s) => s.company._id);
		const items = await Item.find({ company: { $in: companies } });

		const finalArr = userSubscriptions.map((s) => {
			const subName = `${s.company.name} ${s.subscription.name}`;
			const subItems = s.subscription.plan.map((i) => {
				const item = items.find(
					(itm) => itm._id.toString() === i.item.toString()
				);

				const creditsLeft = credits.filter(
					(c) =>
						c.userSubscription.toString() === s._id.toString() &&
						c.item._id.toString() === item._id.toString()
				).length;

				return {
					_id: item._id,
					name: item.name,
					credits: creditsLeft,
				};
			});
			return {
				name: subName,
				items: subItems,
				userSubscriptionId: s._id,
				cancelledBySpot: s.cancelledBySpot,
			};
		});

		Handlers.success(res, 200, { subscriptions: finalArr });
	} catch (e) {
		Handlers.error(res, e, 'getCredits');
	}
};
