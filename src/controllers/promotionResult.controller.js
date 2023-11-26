const PromotionResultService = require("../services/promotionResult.service");

class PromotionResultController {

  async getAll(req, res) {
    try {
      const promotionResults = await PromotionResultService.getAll();
      res.json(promotionResults);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req, res) {
    try {
      const promotionResult = await PromotionResultService.create(req.body);
      res.json(promotionResult);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getByOrderId(req, res) {
    try {
      const promotionResults = await PromotionResultService.getByOrderId(
        req.params.id
      );
      res.json(promotionResults);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getByPromotionId(req, res) {
    try {
      const promotionResults = await PromotionResultService.getByPromotionId(
        req.params.id
      );
      res.json(promotionResults);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async qtyUsedPromotion(req, res) {
    try {
      const qty = await PromotionResultService.qtyUsedPromotion(req.params.id);
      res.json(qty);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async qtyUsedPromotionByCustomerPerDay(req, res) {
    try {
      const qty = await PromotionResultService.qtyUsedPromotionByCustomerPerDay(
        req.params.idPromotion,
        req.params.idCustomer,
        req.params.date
      );
      res.json(qty);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async totalMoneyUsedPromotion(req, res) {
    try {
      const totalMoney = await PromotionResultService.totalMoneyUsedPromotion(
        req.params.id
      );
      res.json(totalMoney);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PromotionResultController();
