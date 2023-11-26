const MomoPayController = require("../controllers/momoPay.controller");
const router = require("express").Router();

router.post("/payment/:amount", MomoPayController.payment);
router.post("/status", MomoPayController.getRequsetPaymentStatus);
router.post("/refund", MomoPayController.refund);

module.exports = router;