const createCompany = require('./create');
const addBankAccount = require('./addBankAccount');
const editCompany = require('./edit');
const getOne = require('./getOne');
const getDashboard = require('./getDashboard');

module.exports = {
	addBankAccount,
	createCompany,
	editCompany,
	getOne,
	getDashboard,
};
