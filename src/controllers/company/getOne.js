const Item = require('../../models/Item');
const Handlers = require('../../utils/handlers');
const createError = require('../../utils/createError');
const companyService = require('../../services/company');

module.exports = async (req, res) => {
	try {
		const company = (await companyService.getOneCompanyQuery(req.params.id))[0];
		if (!company) throw createError(404, 'No company found with this id');
		const items = await Item.find({ company: company._id });
		company.subscriptions = company.subscriptions
			.map((s) => {
				const plan = s.plan.map((i) => {
					const item = items.find((itm) => {
						return itm._id.toString() === i.item.toString();
					});
					return {
						item,
						quantity: i.quantity,
					};
				});
				return {
					...s,
					plan,
				};
			})
			.filter((s) => s.active);

		Handlers.success(res, 200, { company }, null);
	} catch (e) {
		Handlers.error(res, e, 'createCompany');
	}
};
