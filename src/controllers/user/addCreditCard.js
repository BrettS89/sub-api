const User = require('../../models/User');
const Handlers = require('../../utils/handlers');
const userAuth = require('../../utils/userAuth');
const createError = require('../../utils/createError');
const stripe = require('../../utils/stripe');

module.exports = async (req, res) => {
	try {
		const { _id } = await userAuth(req.header('authorization'));
		const user = await User.findById(_id);
		if (!user) throw createError(404, 'No user found');
		const { cardNumber, cvc, date } = req.body;
		const month = Number(date.split('/')[0]);
		const year = Number(date.split('/')[1]);

		const {
			id,
			card: { brand, last4 },
		} = await stripe.createCardToken(cardNumber, month, year, cvc);

		if (user.stripeId) {
			await stripe.updateCustomer(user.stripeId, id);
		} else {
			const response = await stripe.createCustomer(id, user.email);
			user.stripeId = response.id;
		}

		user.cardType = brand;
		user.cardLast4 = last4;
		const updatedUser = await user.save();

		Handlers.success(res, 200, { user: updatedUser }, null);
	} catch (e) {
		Handlers.error(res, e, 'addCreditCard');
	}
};
