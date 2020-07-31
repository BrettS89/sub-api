const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const Company = require('../../models/Company');
const User = require('../../models/User');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const user = await User.findById(_id);
		if (user.company)
			throw createError(400, 'This user is already associated with a company');
		if (!req.body.acceptedTerms) {
			throw createError(
				400,
				'You must agree to the partner agreement and privacy policy'
			);
		}
		const newCompany = new Company(req.body);
		const tags = req.body.tags
			.split(' ')
			.map((t) => {
				return t.replace(/\W/g, '').toLowerCase();
			})
			.join(' ');
		newCompany.tags = tags;
		newCompany.users = [_id];
		const promises = [newCompany.save()];
		const [company] = await Promise.all(promises);
		user.company = company._id;
		const updatedUser = await user.save();
		Handlers.success(res, 201, { company, user: updatedUser }, null);
	} catch (e) {
		Handlers.error(res, e, 'createCompany');
	}
};
