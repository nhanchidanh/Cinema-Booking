const ZaloPayController = require('../controllers/zaloPay.controller');
const router = require("express").Router();

router.post("/payment/:amount", ZaloPayController.payment);
router.post("/status/:appTransId/:appTime", ZaloPayController.getRequsetPaymentStatus);

module.exports = router;