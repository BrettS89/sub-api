const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
	subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
	price: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
