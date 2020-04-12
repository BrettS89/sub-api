module.exports = (amount) => {
	const twelvePointNinePercent = amount * 0.129;
	const value = (amount - twelvePointNinePercent - 0.3).toFixed(2);
	console.log(value);
	return value * 100;
};
