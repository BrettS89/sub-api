const Handlers = require('../../utils/handlers');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		console.log(req.body);
		Handlers.success(res, 200, { message: 'submitted' }, null);
	} catch (e) {
		Handlers.error(res, e, 'addCreditCard');
	}
};
