const router = require('express').Router();
const Controllers = require('../controllers/item');

router.post('/create', Controllers.createItem);
router.get('/get', Controllers.getItem);
router.delete('/delete/:id', Controllers.deleteItem);

module.exports = router;
