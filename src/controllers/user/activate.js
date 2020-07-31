const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		Handlers.success(res, 200, { status: 'activated' }, null);
	} catch (e) {
		Handlers.error(res, e, 'activateUser');
	}
};
