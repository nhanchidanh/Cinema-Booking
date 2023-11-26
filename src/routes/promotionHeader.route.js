const PromotionController = require('../controllers/promotionHeader.controller');
const router = require('express').Router();
const uploadFile = require('../middleware/uploadFile.middleware');

router.get('/', PromotionController.getAllPromotionHeader);
router.get('/:id', PromotionController.getPromotionHeaderById);
router.post('/',uploadFile.uploadFileMiddleware, PromotionController.createPromotionHeader);
router.put('/:id',uploadFile.uploadFileMiddleware, PromotionController.updatePromotionHeader);
router.delete('/:id', PromotionController.deletePromotionHeader);
router.post('/check/promotion', PromotionController.checkPromotion)
router.get('/code/:code', PromotionController.getPromotionHeaderByCode);

module.exports = router;
