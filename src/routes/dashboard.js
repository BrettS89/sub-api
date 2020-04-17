const router = require('express').Router();
const Controllers = require('../controllers/dashboard');

router.get('/', Controllers.getDashboard);

module.exports = router;
