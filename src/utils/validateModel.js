const createError = require('./createError');

module.exports = model => {
	for (let r in model) {
		if (model[r] === undefined) {
			console.log(r, model[r]);
			throw createError(400, `${r} cannont be undefined`);
		}
	}
};
