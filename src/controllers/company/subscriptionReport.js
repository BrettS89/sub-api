const UserSubscription = require('../../models/UserSubscription');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const subsArr = [
			UserSubscription.find({
				company,
				billingFrequency: 'week',
				active: true,
			}),
			UserSubscription.find({
				company,
				billingFrequency: 'month',
				active: true,
			}),
		];
		const [weeklySubs, monthlySubs] = await Promise.all(subsArr);
		const monthlySubscribers = monthlySubs.length;
		const monthlySubsAmount = monthlySubs.reduce((a, b) => {
			return a + b.price;
		}, 0);
		const weeklySubscribers = weeklySubs.length;
		const weeklySubsAmount = weeklySubs.reduce((a, b) => {
			return a + b.price;
		}, 0);
		const subscriptionData = {
			monthlySubs: monthlySubscribers,
			monthlyAmount: monthlySubsAmount,
			weeklySubs: weeklySubscribers,
			weeklyAmount: weeklySubsAmount,
		};
		Handlers.success(res, 200, { subscriptionData });
	} catch (e) {
		Handlers.error(res, e, 'subscriptionReport');
	}
};
