const createCompany = require('./create');
const getCompany = require('./get');

module.exports = {
	...createCompany,
	...getCompany,
};
