const getLocationsServices = require('../../services/location');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
	try {
		const locations = await getLocationsServices.getLocations(
			-74.03599,
			40.71626
		);
		console.log(locations);
		const formattedCopmanies = locations.map((l) => {
			return {
				_id: l._id.company[0]._id,
				company: l._id.company[0],
			};
		});
		Handlers.success(res, 200, { locations: formattedCopmanies });
	} catch (e) {
		Handlers.error(res, e, 'getLocations');
	}
};
