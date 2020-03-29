const Item = require('../../models/Item');
const Subscription = require('../../models/Subscription');
const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { id } = req.params;
		const { company } = await storeAuth(req.header('authorization'));
		const item = await Item.findById(id);
		const subscriptions = await Subscription.find({ company });
		subscriptions.forEach(s => {
			s.plan.forEach(i => {
				const currItem = item._id.toString();
				const planItem = i.item.toString();
				if (currItem === planItem)
					throw createError(
						400,
						'Item is currently being used in active subscription. Cannot delete'
					);
			});
		});
		await Item.findByIdAndDelete(id);
		Handlers.success(res, 200, { item: item._id });
	} catch (e) {
		Handlers.error(res, e, 'createItem');
	}
};
