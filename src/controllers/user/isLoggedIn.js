const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const foundUser = await User.findById(user._id);
		if (!foundUser) throw createError(404, 'Could not find user');
		Handlers.success(res, 200, { user: foundUser }, null);
	} catch (e) {
		Handlers.error(res, e, 'isLoggedIn');
	}
};
