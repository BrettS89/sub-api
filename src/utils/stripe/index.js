const keys = require('../../config');
const stripe = require('stripe')(keys.stripeSecretKey);
const calculateCompanyPayment = require('../calculateCompanyPayment');

exports.createCardToken = (number, exp_month, exp_year, cvc) => {
	return stripe.tokens.create({
		card: {
			number,
			exp_month,
			exp_year,
			cvc,
		},
	});
};

exports.createCustomer = (source, email) => {
	return stripe.customers.create({
		source,
		email,
	});
};

exports.updateCustomer = (customerId, source) => {
	return stripe.customers.update(customerId, {
		source,
	});
};

exports.getCompanyStripeId = (authCode) => {
	return stripe.oauth.token({
		grant_type: 'authorization_code',
		code: authCode,
	});
};

exports.billUser = async (amount, customerId, companyId) => {
	const transferAmount = calculateCompanyPayment(amount);
	await stripe.paymentIntents.create({
		payment_method_types: ['card'],
		amount: amount * 100,
		currency: 'usd',
		confirm: true,
		customer: customerId,
		transfer_data: {
			amount: transferAmount,
			destination: companyId,
		},
	});
};
