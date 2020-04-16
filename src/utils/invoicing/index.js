const schedule = require('node-schedule');
const Credit = require('../../models/Credit');
const UserSubscription = require('../../models/UserSubscription');
const stripe = require('../stripe');
const addCredits = require('../../utils/addCredits');
const getIsoDate = require('../../utils/getIsoDate');

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 0 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 1 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 2 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 3 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 3, dayOfWeek: 4 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 5 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 0, minute: 1, dayOfWeek: 6 }, () => {
	invoice();
});

async function invoice() {
	console.log('inn');
	console.time('Invoice');
	const weekDay = new Date().toString().split(' ')[0];
	const date = new Date().toString().split(' ')[2];

	let usersProcessed = 0;

	let userSubscriptions = await UserSubscription.find({ active: true })
		.or([{ billOn: weekDay }, { billOn: date }])
		.limit(1)
		.sort('lastName')
		.populate('subscription')
		.populate('company')
		.populate('userId', ['_id', 'email', 'stripeId', 'lastName'])
		.skip(usersProcessed);
	console.log(userSubscriptions);
	while (userSubscriptions.length) {
		userSubscriptions.forEach(async (s) => {
			// if (s.isoDate !== getIsoDate()) {
			if (true) {
				try {
					await Credit.remove({ userSubscription: s._id });
					await stripe.billUser(s.price, s.userId.stripeId, s.company.stripeId);
					await addCredits(s.userId._id, s.subscription, s._id);
				} catch (e) {
					console.log(e);
				}
			}
		});

		usersProcessed += userSubscriptions.length;

		userSubscriptions = await UserSubscription.find({ active: true })
			.or([{ billOn: weekDay }, { billOn: date }])
			.limit(100)
			.sort('lastName')
			.populate('subscription')
			.populate('company')
			.populate('userId', ['stripeId', 'lastName'])
			.skip(usersProcessed);
	}
	console.timeEnd('Invoice');
}
