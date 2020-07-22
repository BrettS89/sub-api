const register = require('./register');
const login = require('./login');
const isLoggedIn = require('./isLoggedIn');
const addCreditCard = require('./addCreditCard');
const contactUs = require('./contactUs');
const sendToken = require('./sendToken');
const verifyToken = require('./verifyToken');

module.exports = {
	register,
	login,
	isLoggedIn,
	addCreditCard,
	contactUs,
	sendToken,
	verifyToken,
};
