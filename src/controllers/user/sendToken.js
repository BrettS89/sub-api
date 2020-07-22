const speakeasy = require('speakeasy');
const twilio = require('../../utils/twilio');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');

module.exports = async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const foundUser = await User.findById(user._id);
		const phoneNumber = req.body.phoneNumber;
		const secret = speakeasy.generateSecret({ length: 20 });
		const phoneToken = speakeasy.totp({
			secret: secret.base32,
			encoding: 'base32',
		});
		foundUser.phoneNumber = phoneNumber;
		foundUser.secret = secret.base32;
		await foundUser.save();
		twilio.send2faToken(phoneNumber, phoneToken);
		Handlers.success(res, 200, { status: 'token sent' }, null);
	} catch (e) {
		Handlers.error(res, e, 'activateUser');
	}
};
