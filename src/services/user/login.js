const bcrypt = require('bcryptjs');

exports.checkPassword = (password, storedPassword) => {
	return bcrypt.compareSync(password, storedPassword);
};
