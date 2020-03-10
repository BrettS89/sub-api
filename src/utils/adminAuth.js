const jwt = require('jsonwebtoken');
const keys = require('../config');
const createError = require('../utils/createError');

exports.adminAuth = async token => {
	if (!token) throw createError(401, 'No auth token');
	await jwt.verify(token, keys.jwtSecret);
	const decodedUser = jwt.decode(token);
	if (!decodedUser) throw createError(401, 'Unauthorized');
	return decodedUser;
};
