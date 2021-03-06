const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	name: { type: String, required: true },
	company: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
	billingFrequency: { type: String, required: true },
	price: { type: Number, required: true },
	plan: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Item',
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
	photo: { type: String, default: null },
	description: { type: String, default: null },
	active: { type: Boolean, default: true },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
