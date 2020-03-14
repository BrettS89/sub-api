const locationService = require('../../services/location');
const storeAuth = require('../../utils/storeAuth');
const Handlers = require('../../utils/handlers');
const getCoords = require('../../utils/geoCode');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		const { address, city, state } = req.body;
		const { lat, lng } = await getCoords(address, city, state);
		req.body.lat = lat;
		req.body.lon = lng;
		req.body.company = company;
		const location = await locationService.createInstance(req.body).save();
		Handlers.success(res, 200, { location }, null);
	} catch (e) {
		Handlers.error(res, e, 'createLocation');
	}
};
