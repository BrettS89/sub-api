const router = require('express').Router();
const Controllers = require('../controllers/subscriptions');

router.get('/get', Controllers.getSubscriptions);

module.exports = router;
