const router = require('express').Router();
const Controllers = require('../controllers/company');

router.post('/create', Controllers.createCompany);
router.patch('/addbankaccount', Controllers.addBankAccount);
router.patch('/edit', Controllers.editCompany);
router.get('/getone/:id', Controllers.getOne);

module.exports = router;
