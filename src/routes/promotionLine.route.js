const PromotionLineController = require("../controllers/promotionLine.controller");
const router = require("express").Router();

router.get("/", PromotionLineController.getAllPromotionLine);
router.get("/:id", PromotionLineController.getPromotionLineById);
router.get(
  "/promotionHeader/:id",
  PromotionLineController.getPromotionLineByPromotionHeaderId
);
router.get("/code/:code", PromotionLineController.getPromotionLineByCode);
router.post("/", PromotionLineController.createPromotionLine);
router.put("/:id", PromotionLineController.updatePromotionLine);
router.delete("/:id", PromotionLineController.deletePromotionLine);
router.get("/active/all", PromotionLineController.getPromotionLineActive);

module.exports = router;
