if (process.env.NODE_ENV === 'production') {
	module.exports = require('./remote');
} else {
	module.exports = require('./local');
}
