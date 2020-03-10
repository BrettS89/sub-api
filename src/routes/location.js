const router = require('express').Router();
const Controllers = require('../controllers/location');

router.post('/create', Controllers.createLocation);
router.get('/get', Controllers.getLocations);

module.exports = router;
