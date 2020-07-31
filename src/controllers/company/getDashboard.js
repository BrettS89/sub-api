const Item = require('../../models/Item');
const Company = require('../../models/Company');
const Subscription = require('../../models/Subscription');
const Location = require('../../models/Location');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const promiseArr = [
			Item.find({ company }).lean(),
			Company.findById(company).lean(),
			Subscription.find({ company, active: true }).lean(),
			Location.find({ company }).lean(),
		];
		const [items, companyData, subscriptions, locations] = await Promise.all(
			promiseArr
		);

		const subscriptionArr = subscriptions.map((sub) => {
			const subPlan = sub.plan.map((i) => {
				const item = items.find((itm) => {
					return itm._id.toString() === i.item.toString();
				});
				return {
					...i,
					...item,
				};
			});
			return {
				...sub,
				plan: subPlan,
			};
		});

		Handlers.success(
			res,
			200,
			{
				items,
				company: companyData,
				subscriptions: subscriptionArr,
				locations,
			},
			null
		);
	} catch (e) {
		Handlers.error(res, e, 'getDashboard');
	}
};
