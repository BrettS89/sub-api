const Company = require('../../models/Company');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const subService = require('../../services/subscription');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const foundCompany = await Company.findById(company);
		foundCompany.subscriptions = foundCompany.subscriptions + 1;
		req.body.company = company;
		const subscription = subService.createSubInstance(req.body);
		const promiseArr = [subscription.save(), foundCompany.save()];
		const [createdSubscription, updatedCompany] = await Promise.all(promiseArr);
		Handlers.success(res, 201, { subscription: createdSubscription });
	} catch (e) {
		Handlers.error(res, e, 'createSubscription');
	}
};
