const PromotionHeader = require("../models/PromotionHeader");
const { Op } = require("sequelize");

class PromotionHeaderRepository {
  async getAllPromotionHeader({ start_date, end_date }) {
    const where = {
      statusPromotion: { [Op.ne]: 3 },
    };
    if (start_date && end_date) {
      where.startDate = {
        [Op.between]: [start_date, end_date],
      };
      where.endDate = {
        [Op.between]: [start_date, end_date],
      };
    }

    return await PromotionHeader.findAll({
      where: where,
      order: [["id", "DESC"]],
    });
  }

  async getPromotionHeaderById(id) {
    return await PromotionHeader.findOne({
      where: {
        id: id,
      },
    });
  }

  async getPromotionHeaderByName(name) {
    return await PromotionHeader.findOne({
      where: {
        namePromotion: name,
      },
    });
  }

  async getPromotionHeaderByCode(code) {
    return await PromotionHeader.findOne({
      where: {
        promotionCode: code,
      },
    });
  }

  async createPromotionHeader(promotionHeader) {
    return await PromotionHeader.create(promotionHeader);
  }

  async updatePromotionHeader(id, promotionHeader) {
    return await PromotionHeader.update(promotionHeader, {
      where: {
        id: id,
      },
    });
  }

  async deletePromotionHeader(id) {
    return await PromotionHeader.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = new PromotionHeaderRepository();
