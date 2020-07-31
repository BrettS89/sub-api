const speakeasy = require('speakeasy');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const foundUser = await User.findById(user._id);
		const tokenValidates = speakeasy.totp.verify({
			secret: foundUser.secret,
			encoding: 'base32',
			token: req.body.token,
			window: 120,
		});
		if (!tokenValidates) throw createError(401, 'Incorrect verification code');
		foundUser.activated = true;
		const updatedUser = await foundUser.save();
		Handlers.success(res, 200, { user: updatedUser }, null);
	} catch (e) {
		Handlers.error(res, e, 'activateUser');
	}
};
