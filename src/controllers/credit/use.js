const Credit = require('../../models/Credit');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const credit = await Credit.findOne({
			used: false,
			user: _id,
			item: req.params.id,
		});
		if (!credit) throw createError('Invalid credit');
		credit.used = true;
		const newCredit = await credit.save();
		Handlers.success(res, 200, { itemId: req.params.id });
	} catch (e) {
		Handlers.error(res, e, 'useCredit');
	}
};
