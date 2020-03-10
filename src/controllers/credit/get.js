const Credit = require('../../models/Credit');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const credits = await Credit.find({
			used: false,
			user: _id,
		})
			.populate('subscription', ['name', 'photo'])
			.populate('item')
			.populate('company', ['name']);

		const subObj = {};
		credits.forEach(c => {
			if (subObj[c.company.name + ' ' + c.subscription.name]) {
				if (subObj[c.company.name + ' ' + c.subscription.name][c.item.name]) {
					subObj[c.company.name + ' ' + c.subscription.name][
						c.item.name
					].credits.push(c);
				} else {
					subObj[c.company.name + ' ' + c.subscription.name] = {
						...subObj[c.company.name + ' ' + c.subscription.name],
						[c.item.name]: {
							_id: c.item._id,
							credits: [c],
						},
					};
				}
			} else {
				subObj[c.company.name + ' ' + c.subscription.name] = {
					[c.item.name]: {
						_id: c.item._id,
						credits: [c],
					},
				};
			}
		});

		const subsArr = Object.entries(subObj).map(s => {
			const [k, v] = s;
			const items = Object.entries(v).map(i => {
				const [itemName, itemObj] = i;
				return {
					_id: itemObj._id,
					name: itemName,
					credits: itemObj.credits.length,
				};
			});
			return {
				name: k,
				items,
			};
		});

		Handlers.success(res, 200, { subscriptions: subsArr });
	} catch (e) {
		Handlers.error(res, e, 'getCredits');
	}
};
