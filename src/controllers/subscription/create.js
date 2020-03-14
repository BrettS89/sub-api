const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const subService = require('../../services/subscription');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		req.body.company = company;
		const subscription = await subService.createSubInstance(req.body);
		const createdSubscription = await subscription.save();
		Handlers.success(res, 201, { subscription: createdSubscription });
	} catch (e) {
		Handlers.error(res, e, 'createSubscription');
	}
};
