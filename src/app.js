const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// require routes
const creditRoutes = require('./routes/credit');
const userSubscriptionRoutes = require('./routes/userSubscription');
const subscriptionsRoutes = require('./routes/subscriptions');
const subscriptionRoutes = require('./routes/subscription');
const userRoutes = require('./routes/user');
const locationRoutes = require('./routes/location');
const itemRoutes = require('./routes/item');
const companyRoutes = require('./routes/company');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use cors
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	})
);

// use routes
app.use('/api/credit', creditRoutes);
app.use('/api/usersubscription', userSubscriptionRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
