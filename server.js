const app = require('./src/app');
const mongoose = require('mongoose');
const keys = require('./src/config');

const isInTest = typeof global.it === 'function';
const mongoURI = isInTest ? keys.mongoTestURI : keys.mongoURI;

mongoose.connect(mongoURI);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});

module.exports = app;
