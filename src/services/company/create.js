const Company = require('../../models/Company');

exports.createCompanyInstance = data => {
	return new Company({});
};
