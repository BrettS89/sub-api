const Location = require('../../models/Location');

exports.createInstance = data => {
	return new Location({
		address: data.address,
		city: data.city,
		state: data.state,
		zip: data.zip,
		fullAddress: `${data.address} ${data.city} ${data.state} ${data.zip}`,
		location: {
			type: 'Point',
			coordinates: [data.lon, data.lat],
		},
		company: data.company,
	});
};
