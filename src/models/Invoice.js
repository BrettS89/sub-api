const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	subscriptions: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
	],
});

module.exports = mongoose.model('Invoice', invoiceSchema);
