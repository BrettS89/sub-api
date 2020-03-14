const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const Company = require('../../models/Company');
const Subscription = require('../../models/Subscription');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const promiseArr = [
			Company.findById(company),
			Subscription.find({ company }),
		];
		const [foundCompany, subscriptions] = await Promise.all(promiseArr);
		if (!foundCompany.stripeId)
			throw createError(400, 'Must add bank account first');
		if (!subscriptions.length)
			throw createError(
				400,
				'Must add at least one subscription before publishing company'
			);
		foundCompany.published = true;
		foundCompany.approved = true;
		const publishedCompany = await foundCompany.save();
		Handlers.success(res, 200, { company: publishedCompany });
	} catch (e) {
		Handlers.error(res, e, 'publishCompany');
	}
};
