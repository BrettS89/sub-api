const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const loginService = require('../../services/user/login');
const registerService = require('../../services/user/register');

module.exports = async ({ body: { email, password } }, res) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw {
				status: 404,
				error: new Error('No user found with this email'),
			};
		}
		const passwordMatch = loginService.checkPassword(password, user.password);
		if (!passwordMatch) {
			throw {
				status: 401,
				error: new Error('incorrect login credentials'),
			};
		}
		const token = registerService.createToken(user._id);
		Handlers.success(res, 200, { user, token }, null);
	} catch (e) {
		Handlers.error(res, e, 'login');
	}
};
