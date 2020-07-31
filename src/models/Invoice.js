const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
	subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
	userSubscription: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserSubscription',
	},
	price: { type: Number, required: true },
	charged: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
