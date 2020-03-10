const router = require('express').Router();
const Controllers = require('../controllers/subscription');

router.get('/get/:id', Controllers.getSubscription);
router.post('/create', Controllers.createSubscription);
router.patch('/edit', Controllers.updateSubscription);

module.exports = router;
