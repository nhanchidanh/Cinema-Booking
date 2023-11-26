const OrderController = require('../controllers/order.controller');
const OrderDetailController = require('../controllers/orderDetail.controller');
const router = require('express').Router();

router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getById);
router.get('/customer/:id', OrderController.getByCustomerId);
router.get('/staff/:id', OrderController.getByStaffId);
router.post('/', OrderController.create);
router.put('/:id', OrderController.updateStatus);
router.get('/:id/orderDetails', OrderDetailController.getByOrderId);
router.put('/refund/:id', OrderController.refund);
router.get('/type/:type', OrderController.getByType);

module.exports = router;