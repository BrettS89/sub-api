const keys = require('../../config');
const twilio = require('twilio')(keys.twilioAccountSid, keys.twilioAuthToken);

exports.send2faToken = (number, token) => {
	const body = `Your Paradyse verification code is: ${token}`;
	twilio.messages.create({ body, to: number, from: '+12018083849' });
};
