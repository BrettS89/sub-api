const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	stripeId: { type: String, default: null },
	cardType: { type: String, default: null },
	cardLast4: { type: String, defualt: null },
	isAdmin: { type: Boolean, default: false },
	company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

module.exports = mongoose.model('User', userSchema);
