const Company = require('../../models/Company');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const stripeService = require('../../utils/stripe');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const foundCompany = await Company.findById(company);
		const response = await stripeService.getCompanyStripeId(req.body.authCode);
		foundCompany.stripeId = response.stripe_user_id;
		await foundCompany.save();
		Handlers.success(res, 200, { message: 'stripeId saved' });
	} catch (e) {
		Handlers.error(res, e, 'CompanyAddBankAccount');
	}
};
