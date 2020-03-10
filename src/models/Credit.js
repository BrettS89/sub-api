const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
	createdAt: { type: Date, defualt: new Date() },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	userSubscription: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'UserSubscription',
		required: true,
	},
	subscription: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subscription',
		required: true,
	},
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Item',
		required: true,
	},
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
	used: { type: Boolean, default: false },
});

module.exports = mongoose.model('Credit', creditSchema);
