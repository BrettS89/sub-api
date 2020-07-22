const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config');

exports.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

exports.createUserInstance = ({ email, password }) => {
	return new User({
		email,
		password,
	});
};

exports.createToken = (_id) => {
	return jwt.sign({ _id }, keys.jwtSecret);
};
