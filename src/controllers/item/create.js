const Item = require('../../models/Item');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');

module.exports = async (req, res) => {
	try {
		const { name } = req.body;
		const { company } = await storeAuth(req.header('authorization'));
		const newItem = new Item({
			name,
			company,
		});
		const item = await newItem.save();
		Handlers.success(res, 201, { item }, null);
	} catch (e) {
		Handlers.error(res, e, 'createItem');
	}
};
