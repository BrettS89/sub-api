const AWS = require('aws-sdk');
const keys = require('../../config');

const s3 = new AWS.S3({
	accessKeyId: keys.s3AccessKeyId,
	secretAccessKey: keys.s3SecretAccessKey,
});

exports.getSignedUrl = async (fileType, key) => {
	const url = await s3.getSignedUrl('putObject', {
		Bucket: keys.s3Bucket,
		Key: key,
		ContentType: fileType,
	});

	return {
		url,
		key: `${keys.s3Key}/${key}`,
	};
};
