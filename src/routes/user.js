const router = require('express').Router();
const Controllers = require('../controllers/user');

router.post('/register', Controllers.register);
router.post('/login', Controllers.login);
router.get('/isloggedin', Controllers.isLoggedIn);
router.patch('/addcreditcard', Controllers.addCreditCard);

module.exports = router;
