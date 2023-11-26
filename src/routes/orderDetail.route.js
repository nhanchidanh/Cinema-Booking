const OrderDetailController = require('../controllers/orderDetail.controller');
const router = require('express').Router();

router.get('/', OrderDetailController.getAll);
router.get('/:id', OrderDetailController.getById);
router.post('/', OrderDetailController.create);

module.exports = router;

