const schedule = require('node-schedule');
const Credit = require('../../models/Credit');
const UserSubscription = require('../../models/UserSubscription');
const Invoice = require('../../models/Invoice');
const stripe = require('../stripe');
const addCredits = require('../../utils/addCredits');
const getIsoDate = require('../../utils/getIsoDate');
const emailReport = require('../../utils/sendgrid').sendBillingErrorReport;

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 0 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 1 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 2 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 3 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 4 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 5 }, () => {
	invoice();
});

schedule.scheduleJob({ hour: 7, minute: 1, dayOfWeek: 6 }, () => {
	invoice();
});

async function invoice() {
	let report = '';
	let errors = 0;
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

	while (userSubscriptions.length) {
		userSubscriptions.forEach(async (s) => {
			let status = '';
			if (s.isoDate !== getIsoDate() && !s.cancelledBySpot) {
				try {
					await Credit.remove({ userSubscription: s._id });
					status += 'credits removed ';
					await stripe.billUser(s.price, s.userId.stripeId, s.company.stripeId);
					status += 'user billed ';
					await addCredits(s.userId._id, s.subscription, s._id);
					status += 'credits added';
					const createdInvoice = new Invoice({
						user: s.userId._id,
						company: s.company._id,
						subscription: s.subscription._id,
						userSubscription: s._id,
						price: s.price,
						charged: s.price,
					});
					await createdInvoice.save();
					status += 'invoice created';
				} catch (e) {
					report += `${s.userId.email}\n${status}\n${e.message}\nUser subscription ${s._id}\n \n`;
					errors++;
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
	await emailReport(report, errors.toString());
}
