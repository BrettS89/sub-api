const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
	name: { type: String, required: true },
	company: { type: Schema.Types.ObjectId, ref: 'Company' },
});

module.exports = model('Item', itemSchema);
