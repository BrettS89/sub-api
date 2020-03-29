const sgMail = require('@sendgrid/mail');
const { sendgridKey } = require('../../config');
sgMail.setApiKey(sendgridKey);

exports.submitContactForm = async (email, message) => {
	const msg = {
		to: 'brett@paradyse.app',
		from: email,
		subject: 'Contact form submission',
		text: `${email} : ${message}`,
	};
	await sgMail.send(msg);
};
