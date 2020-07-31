const speakeasy = require('speakeasy');
const twilio = require('../../utils/twilio');
const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const user = await userAuth(req.header('authorization'));
		const phoneNumber = req.body.phoneNumber;
		const [foundUser, existingAccount] = await Promise.all([
			User.findById(user._id),
			User.find({ phoneNumber }),
		]);
		// if (existingAccount.length)
		// 	throw createError(
		// 		401,
		// 		'An account with this phone number already exists.'
		// 	);
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
