const keys = require('../../config');
const stripe = require('stripe')(keys.stripeSecretKey);

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

exports.processPayment = (customerId, amount) => {
	return stripe.charges.create({
		amount,
		currency: 'usd',
		customer: customerId,
	});
};

exports.getCompanyStripeId = authCode => {
	return stripe.oauth.token({
		grant_type: 'authorization_code',
		code: authCode,
	});
};
