const UserSubscription = require('../../models/UserSubscription');
const Company = require('../../models/Company');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
	try {
		const promiseArr = [
			UserSubscription.find({ active: true }).count(),
			Company.find({ published: true }).count(),
		];
		const [subscriptions, spots] = await Promise.all(promiseArr);
		Handlers.success(res, 201, { subscriptions, spots });
	} catch (e) {
		Handlers.error(res, e, 'getDashboard');
	}
};
