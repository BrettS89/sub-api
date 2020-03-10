const app = require('./src/app');
const mongoose = require('mongoose');
const keys = require('./src/config');

mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});
