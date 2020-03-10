const getIsoDate = require('../../utils/getIsoDate');
const UserSubscription = require('../../models/UserSubscription');

exports.formatData = data => {
	return {
		isoDate: getIsoDate(),
		active: data.active,
		invoiceOn: data.invoiceOn,
		userId: data.userId.toString(),
		subscriptionId: data.subscriptionId.toString(),
		subscriptionName: data.subscriptionName,
		plan: data.plan,
		price: data.price,
	};
};

exports.createUserSubscription = data => {
	return new UserSubscription({
		isoDate: getIsoDate(),
		active: true,
		billingFrequency: data.billingFrequency,
		billOn: data.billOn,
		userId: data.userId,
		subscription: data.subscription,
		price: data.price,
		company: data.company,
	});
};
