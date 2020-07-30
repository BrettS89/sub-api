const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	activated: { type: Boolean, default: false },
	cardLast4: { type: String, defualt: null },
	cardType: { type: String, default: null },
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
	createdAt: { type: Date, default: new Date() },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: false },
	firstSubscription: { type: Boolean, default: true },
	isAdmin: { type: Boolean, default: false },
	lastName: { type: String, required: false },
	password: { type: String, required: true },
	phoneNumber: { type: String, default: null },
	secret: { type: String, default: null },
	stripeId: { type: String, default: null },
});

module.exports = mongoose.model('User', userSchema);
