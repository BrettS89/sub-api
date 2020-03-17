const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
	createdAt: { type: Date, default: new Date() },
	name: { type: String, required: true },
	photo: { type: String, default: null },
	tags: { type: String, default: '' },
	discount: { type: Number, default: 0.5 },
	stripeId: { type: String, default: null },
	published: { type: Boolean, default: false },
	approved: { type: Boolean, default: false },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Company', companySchema);
