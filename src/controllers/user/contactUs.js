const Handlers = require('../../utils/handlers');
const createError = require('../../utils/createError');
const { submitContactForm } = require('../../utils/sendgrid');

module.exports = async (req, res) => {
	try {
		const { email, message } = req.body;
		await submitContactForm(email, message);
		Handlers.success(res, 200, { message: 'submitted' }, null);
	} catch (e) {
		Handlers.error(res, e, 'addCreditCard');
	}
};
