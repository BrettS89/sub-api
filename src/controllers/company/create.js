const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const Company = require('../../models/Company');
const User = require('../../models/User');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const newCompany = new Company(req.body);
		newCompany.users = [_id];
		const promises = [newCompany.save(), User.findById(_id)];
		const [company, user] = await Promise.all(promises);
		user.company = company._id;
		await user.save();
		Handlers.success(res, 201, { company }, null);
	} catch (e) {
		Handlers.error(res, e, 'createCompany');
	}
};
