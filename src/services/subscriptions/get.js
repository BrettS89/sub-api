const Subscription = require('../../models/Subscription');

exports.geoSearch = (lon, lat, offset = 0) => {
	return Subscription.find({
		location: {
			$nearSphere: {
				$geometry: {
					type: 'Point',
					coordinates: [lon, lat],
				},
				$maxDistance: 30000,
			},
		},
	})
		.limit(20)
		.skip(offset)
		.populate('Companys', ['name']);
};
