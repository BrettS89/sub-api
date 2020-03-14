const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const Company = require('../../models/Company');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const promiseArr = [Company.findById(company)];
		const [foundCompany] = await Promise.all(promiseArr);
		if (!foundCompany) throw createError(404, 'No company was found');
		foundCompany.published = false;
		const updatedCompany = await foundCompany.save();
		Handlers.success(res, 200, { company: updatedCompany });
	} catch (e) {
		Handlers.error(res, e, 'unpublishCompany');
	}
};
