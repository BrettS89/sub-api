const { model, Schema } = require('mongoose');

const userSubscriptionSchema = new Schema({
	createdAt: { type: Date, default: new Date() },
	isoDate: { type: String, required: true },
	active: { type: Boolean, required: true },
	billOn: { type: String, required: true },
	billingFrequency: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	subscription: {
		type: Schema.Types.ObjectId,
		ref: 'Subscription',
		required: true,
	},
	price: { type: Number, required: true },
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
});

module.exports = model('UserSubscription', userSubscriptionSchema);