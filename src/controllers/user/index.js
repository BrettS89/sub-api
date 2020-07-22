const register = require('./register');
const login = require('./login');
const isLoggedIn = require('./isLoggedIn');
const addCreditCard = require('./addCreditCard');
const contactUs = require('./contactUs');
const sendToken = require('./sendToken');

module.exports = {
	register,
	login,
	isLoggedIn,
	addCreditCard,
	contactUs,
	sendToken,
};
