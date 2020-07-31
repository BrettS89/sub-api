const router = require('express').Router();
const Controllers = require('../controllers/company');

router.post('/create', Controllers.createCompany);
router.patch('/addbankaccount', Controllers.addBankAccount);
router.patch('/edit', Controllers.editCompany);
router.get('/getdashboard', Controllers.getDashboard);
router.get('/getone/:id', Controllers.getOne);
router.patch('/publish', Controllers.publishCompany);
router.patch('/unpublish', Controllers.unpublishCompany);
router.get('/subscriptionreport', Controllers.subscriptionReport);
router.get('/getuploadphotourl', Controllers.getUploadPhotoUrl);
router.get('/stripedashboardlink', Controllers.getStripeDashboardLink);

module.exports = router;
