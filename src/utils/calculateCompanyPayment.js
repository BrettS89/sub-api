const data = require('../../data');

module.exports = (amount, companyId) => {
	const percent = data[companyId.toString()];

	if (percent && percent === 'cost') {
		const twoPointNinePercent = amount * 0.029;
		const value = (amount - twoPointNinePercent - 0.3).toFixed(2);
		return Math.round(value * 100);
	}

	const ninePercent = amount * 0.09;
	const value = (amount - ninePercent).toFixed(2);
	return Math.round(value * 100);
};
