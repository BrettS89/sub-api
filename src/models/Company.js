const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	name: { type: String, required: true },
	photo: { type: String, default: null },
	discount: { type: Number, default: 0.5 },
	stripeId: { type: String, default: null },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Company', companySchema);
