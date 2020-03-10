const jwt = require('jsonwebtoken');
const keys = require('../config');
const createError = require('../utils/createError');
const User = require('../models/User');
const Company = require('../models/Company');

module.exports = async token => {
	if (!token) throw createError(401, 'no auth token');
	try {
		await jwt.verify(token, keys.jwtSecret);
	} catch (e) {
		const error = e.toString().split(' ')[2];
		if (error === 'signature') throw createError(401, 'bad token signature');
	}

	const decodedUser = jwt.decode(token);
	if (!decodedUser) throw createError(401, 'Unauthorized');

	const _id = decodedUser._id;
	const user = await User.findById(_id);
	const company = await Company.findById(user.company);
	if (!company) throw createError(401, 'Unauthorized');
	return user;
};
