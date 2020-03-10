const { model, Schema } = require('mongoose');

const locationSchema = new Schema({
	address: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String, required: true },
	fullAddress: { type: String, required: true },
	location: {
		type: {
			type: String,
			enum: ['Point'],
		},
		coordinates: { type: [Number] },
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
});

module.exports = model('Location', locationSchema);
