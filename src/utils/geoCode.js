const fetch = require('node-fetch');
const { geoApiKey } = require('../config');
const createError = require('../utils/createError');

module.exports = async (address, city, state) => {
	const URI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},+${state}&key=${geoApiKey}`;
	const res = await fetch(URI);
	const response = await res.json();
	if (response.status !== 'OK') throw createError(400, 'geocode error');
	return response.results[0].geometry.location;
};
