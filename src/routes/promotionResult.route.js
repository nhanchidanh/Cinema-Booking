const PromotionResultController = require("../controllers/promotionResult.controller");
const router = require("express").Router();

router.get("/", PromotionResultController.getAll);
router.post("/", PromotionResultController.create);
router.get("/order/:id", PromotionResultController.getByOrderId);
router.get("/promotion/:id", PromotionResultController.getByPromotionId);
router.get("/qtyUsedPromotion/:id", PromotionResultController.qtyUsedPromotion);
router.get(
  "/qtyUsedPromotionByCustomerPerDay/:idPromotion/:idCustomer/:date",
  PromotionResultController.qtyUsedPromotionByCustomerPerDay
);
router.get(
  "/totalMoneyUsedPromotion/:id",
  PromotionResultController.totalMoneyUsedPromotion
);

module.exports = router;
