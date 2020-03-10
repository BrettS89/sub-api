const Subscription = require('../../models/Subscription');

exports.createSubInstance = data => {
	return new Subscription({
		name: data.name,
		company: data.company,
		billingFrequency: data.billingFrequency,
		billOn: data.billOn,
		price: data.price,
		plan: data.plan,
		photo: data.photo,
	});
};
