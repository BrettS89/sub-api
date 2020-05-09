const Company = require('../../models/Company');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const createError = require('../../utils/createError');
const stripe = require('../../utils/stripe');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const foundCompany = await Company.findById(company);
		if (!foundCompany) throw createError(404, 'Could not find company');
		const response = await stripe.getDashboardLink(foundCompany.stripeId);
		Handlers.success(res, 200, { url: response.url });
	} catch (e) {
		Handlers.error(res, e, 'getDashboardLink');
	}
};
