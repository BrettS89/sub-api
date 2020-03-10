const Company = require('../../models/Company');
const Handlers = require('../../utils/handlers');
const adminAuth = require('../../utils/adminAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		await adminAuth(req.header('authorization'));
		const { id, key, value } = req.body;
		const company = await Company.findById(id);
		if (!Company) throw createError(404, 'No company found with this id');
		company[key] = value;
		const updatedCompany = await company.save();
		Handlers.success(res, 200, updatedCompany, null);
	} catch (e) {
		Handlers.error(res, e, 'createCompany');
	}
};
