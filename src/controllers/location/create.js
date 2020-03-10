const locationService = require('../../services/location');
const storeAuth = require('../../utils/storeAuth');
const Handlers = require('../../utils/handlers');

module.exports = async (req, res) => {
	try {
		const { company } = await storeAuth(req.header('authorization'));
		req.body.company = company;
		const location = await locationService.createInstance(req.body).save();
		Handlers.success(res, 200, { location }, null);
	} catch (e) {
		Handlers.error(res, e, 'createLocation');
	}
};
