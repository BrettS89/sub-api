const Handlers = require('../../utils/handlers');
const subService = require('../../services/subscriptions');

module.exports = async (req, res) => {
	try {
		const { zip, offset } = req.query;
		// Use zip to get lat and lon from google api
		const lat = -74.040571;
		const lon = 40.718764;
		let subscriptions = await subService.geoSearch(lon, lat, offset);
		Handlers.success(res, 200, subscriptions, null);
	} catch (e) {
		Handlers.error(res, e, 'getSubscriptions');
	}
};
