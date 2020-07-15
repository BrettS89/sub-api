// module.exports = (amount) => {
// 	const twelvePointNinePercent = amount * 0.129;
// 	const value = (amount - twelvePointNinePercent - 0.3).toFixed(2);
// 	return Math.round(value * 100);
// };

module.exports = (amount) => {
	const ninePercent = amount * 0.09;
	const value = (amount - ninePercent).toFixed(2);
	return Math.round(value * 100);
};
