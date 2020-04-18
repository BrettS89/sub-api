const Handlers = require('../../utils/handlers');
const storeAuth = require('../../utils/storeAuth');
const s3 = require('../../utils/s3');

module.exports = async (req, res) => {
	try {
		const { name, type } = req.query;
		const { url, key } = await s3.getSignedUrl(type, `${company}/${name}`);
		Handlers.success(res, 200, { url, key });
	} catch (e) {
		Handlers.error(res, e, 'getUploadPhotoUrl');
	}
};
