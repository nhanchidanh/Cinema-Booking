const PriceLineController = require('../controllers/priceLine.controller');
const router = require('express').Router();

router.get('/', PriceLineController.getAllPriceLine);
router.get('/:id', PriceLineController.getPriceLineById);
router.get('/priceHeader/:id', PriceLineController.getPriceLineByPriceHeaderId);
router.post('/', PriceLineController.createPriceLine);
router.put('/:id', PriceLineController.updatePriceLine);
router.delete('/:id', PriceLineController.deletePriceLine);
router.post('/check', PriceLineController.checkPriceLine);

module.exports = router;