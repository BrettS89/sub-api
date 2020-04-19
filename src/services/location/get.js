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
				let: { id: '$company' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$_id', '$$id'] },
									{ $eq: ['$published', true] },
								],
							},
						},
					},
				],
				as: 'company',
			},
		},
		{
			$match: { company: { $ne: [] } },
		},
		{ $group: { _id: { company: '$company' }, doc: { $first: '$$ROOT' } } },
	]).limit(50);
};
