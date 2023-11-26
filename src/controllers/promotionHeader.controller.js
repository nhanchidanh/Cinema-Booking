const PromotionHeaderService = require("../services/promotionHeader.service");

class PromotionHeaderController {
  // [GET] /promotions
  async getAllPromotionHeader(req, res) {
    try {
      const promotions = await PromotionHeaderService.getAllPromotion(req.query);
      res.status(200).json(promotions);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  // [GET] /promotions/:id
  async getPromotionHeaderById(req, res) {
    try {
      const promotion = await PromotionHeaderService.getPromotionById(req.params.id);
      res.status(200).json(promotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async getPromotionHeaderByCode(req, res) {
    try {
      const promotion = await PromotionHeaderService.getPromotionByCode(req.params.code);
      res.status(200).json(promotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  // [POST] /promotions
  async createPromotionHeader(req, res) {
    try {
      const promotion = await PromotionHeaderService.createPromotion(req);
      res.status(201).json(promotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  // [PUT] /promotions/:id
  async updatePromotionHeader(req, res) {
    try {
      const { id } = req.params;
      const updatePromotion = await PromotionHeaderService.updatePromotion(
        id,
        req
      );
      res.status(200).json(updatePromotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  // [DELETE] /promotions/:id
  async deletePromotionHeader(req, res) {
    try {
      const { id } = req.params;
      const deletePromotion = await PromotionHeaderService.deletePromotion(id);
      res.status(200).json(deletePromotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async checkPromotion(req, res) {
    try {

      const promotion = await PromotionHeaderService.checkPromotionApplicable(req.body);
      res.status(200).json(promotion);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new PromotionHeaderController();
