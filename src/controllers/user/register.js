const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userService = require('../../services/user');

module.exports = async (req, res) => {
	try {
		const foundUser = await User.findOne({ email: req.body.email });
		if (foundUser) {
			throw {
				status: 400,
				error: new Error('This email already exists'),
			};
		}
		const hashedPassword = userService.hashPassword(req.body.password);
		req.body.password = hashedPassword;
		const user = await userService.createUserInstance(req.body).save();
		const token = userService.createToken(user._id);
		Handlers.success(res, 201, { token, user }, null);
	} catch (e) {
		Handlers.error(res, e, 'register');
	}
};
