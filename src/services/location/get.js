const Location = require('../../models/Location');

exports.getLocations = (lon, lat) => {
	return Location.aggregate([
		{
			$geoNear: {
				near: { type: 'Point', coordinates: [lon, lat] },
				distanceField: 'dist.location',
				maxDistance: 3000,
			},
		},
		{
			$lookup: {
				from: 'companies',
				localField: 'company',
				foreignField: '_id',
				as: 'company',
			},
		},
		{ $group: { _id: { company: '$company' }, doc: { $first: '$$ROOT' } } },
	]).limit(50);
};
