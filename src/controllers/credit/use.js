const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const credit = await Credit.findOne({
			user: _id,
			_id: req.params.id,
		});
		if (!credit) throw createError('Invalid credit');
		credit.used = false;
		const usedCredit = await credit.save();
		Handlers.success(res, 200, { creditId: usedCredit._id });
	} catch (e) {
		Handlers.error(res, e, 'useCredit');
	}
};
