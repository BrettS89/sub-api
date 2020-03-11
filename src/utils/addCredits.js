const Credit = require('../models/Credit');

module.exports = async (userId, subscription, userSubscriptionId) => {
	const credits = [];
	subscription.plan.forEach(item => {
		for (let i = 0; i < item.quantity; i++) {
			const credit = new Credit({
				user: userId,
				userSubscription: userSubscriptionId,
				item: item.item,
				subscription: subscription._id,
				company: subscription.company,
			});
			credits.push(credit);
		}
	});
	await Credit.collection.insertMany(credits);
};
