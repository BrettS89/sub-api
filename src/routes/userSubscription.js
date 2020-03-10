const router = require('express').Router();
const Controllers = require('../controllers/userSubscription');

router.post('/create', Controllers.createUserSubscription);
router.get('/get', Controllers.getUserSubscriptions);
router.patch('/cancel/:id', Controllers.cancelSubscription);

module.exports = router;
