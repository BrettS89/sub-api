const Handlers = require('../../utils/handlers');
const adminAuth = require('../../utils/adminAuth');
const CompanyService = require('../../services/Company');

module.exports = async (req, res) => {
	try {
		await adminAuth(req.header('authorization'));
	} catch (e) {
		Handlers.error(res, e, 'CompanyAddBankAccount');
	}
};
