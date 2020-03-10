const Location = require('../../models/Location');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
	try {
		const locations = await Location.find().populate('company');
		Handlers.success(res, 200, { locations });
	} catch (e) {
		Handlers.error(res, e, 'getLocations');
	}
};
