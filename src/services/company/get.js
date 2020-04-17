const { Types } = require('mongoose');
const Company = require('../../models/Company');

exports.getOneCompanyQuery = (id) => {
	const companyId = Types.ObjectId(id);
	return Company.aggregate([
		{ $match: { _id: { $eq: companyId } } },
		{
			$lookup: {
				from: 'subscriptions',
				localField: '_id',
				foreignField: 'company',
				as: 'subscriptions',
			},
		},
	]);
};
