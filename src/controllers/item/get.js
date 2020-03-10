const Item = require('../../models/Item');
const storeAuth = require('../../utils/storeAuth');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const items = await Item.find({ company });
		Handlers.success(res, 200, { items });
	} catch (e) {
		Handlers.error(res, e, 'getItems');
	}
};
