const router = require('express').Router();
const Controllers = require('../controllers/credit');

router.get('/get', Controllers.getCredits);
router.patch('/use/:id', Controllers.useCredit);

module.exports = router;
