const jwt = require('jsonwebtoken');
const keys = require('../config');
const createError = require('../utils/createError');

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
	return decodedUser;
};
