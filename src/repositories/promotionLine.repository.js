const PromotionLine = require("../models/PromotionLine");
const { Op } = require("sequelize");
const PromotionHeader = require("../models/PromotionHeader");
const ApplicableCustomer = require("../models/ApplicableCustomer");
const Rank = require("../models/Rank");
const sequelize = require("../config/database");

class PromotionLineRepository {
  async getAllPromotionLine() {
    return await PromotionLine.findAll();
  }

  async getPromotionLineById(id) {
    return await PromotionLine.findOne({
      where: {
        id: id,
      },
    });
  }

  async getPromotionLineByCode(code) {
    return await PromotionLine.findOne({
      where: {
        promotionCode: code,
      },
    });
  }

  async getPromotionLineByPromotionHeaderId(id) {
    return await PromotionLine.findAll({
      where: {
        status: { [Op.ne]: 3 },
        promotionHeaderId: id,
      },
    });
  }

  async createPromotionLine(promotionLine) {
    return await PromotionLine.create(promotionLine);
  }

  async updatePromotionLine(id, promotionLine) {
    return await PromotionLine.update(promotionLine, {
      where: {
        id: id,
      },
    });
  }

  async deletePromotionLine(id) {
    return await PromotionLine.destroy({
      where: {
        id: id,
      },
    });
  }

  async getPromotionLineActive() {
    const data = await PromotionLine.findAll({
      where: {
        status: 1,
      },
      include: {
        model: PromotionHeader,
        attributes: ["id"],
        include: {
          model: ApplicableCustomer,
          as: "promotionHeader",
          attributes: ["id"],
          include: {
            model: Rank,
            as: "rank",
            attributes: ["id", "nameRank"],
          },
        },
      },
      attributes: [
        "id",
        "type",
        "promotionCode",
        "desc",
        "startDate",
        "endDate",
        "max_qty",
        "max_qty_per_customer_per_day",
      ],
    });
    const newData = data.map((item) => {
      let rank = [];
      item.PromotionHeader.promotionHeader.forEach((element) => {
        rank.push(element.rank.nameRank);
      });
      delete item.dataValues.PromotionHeader;
      return {
        ...item.dataValues,
        rank: rank,
      };
    });
    return newData;
  }
}

module.exports = new PromotionLineRepository();
