module.exports = (status, message) => {
	return {
		status,
		error: new Error(message),
	};
};
