const createLocationServices = require('./create');
const getLocations = require('./get');

module.exports = {
	...createLocationServices,
	...getLocations,
};
