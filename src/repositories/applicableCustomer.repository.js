const ApplicableCustomer = require("../models/ApplicableCustomer");
const PromotionHeader = require("../models/PromotionHeader");
const Rank = require("../models/Rank");
const PromotionDetail = require("../models/PromotionDetail");
const PromotionLine = require("../models/PromotionLine");
const { Op } = require("sequelize");
const Product = require("../models/Product");

class ApplicableCustomerRepository {
  async getAllApplicableCustomer() {
    return await ApplicableCustomer.findAll();
  }

  async getApplicableCustomerById(id) {
    return await ApplicableCustomer.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: PromotionHeader,
          attributes: ["id"],
        },
        {
          model: Rank,
          attributes: ["id", "nameRank"],
        },
      ],
    });
  }

  async getApplicableCustomerByPromotionHeaderId(id) {
    const rs = await ApplicableCustomer.findAll({
      where: {
        promotionHeader_id: id,
      },
      include: [
        {
          model: PromotionHeader,
          as: "promotionHeader",
        },
        {
          model: Rank,
          as: "rank",
        },
      ],
    });
    return rs;
  }

  async getRankCustomerByPromotionHeaderId(id) {
    const rs = await ApplicableCustomer.findAll({
      where: {
        promotionHeader_id: id,
      },
      include: [
        {
          model: Rank,
          as: "rank",
          attributes: ["id", "nameRank"],
        },
      ],
      attributes: [],
    });
    return rs;
  }

  async getApplicableCustomerByRankId(id) {
    const rs = await ApplicableCustomer.findAll({
      where: {
        rank_id: id,
      },
      include: [
        {
          model: PromotionHeader,
        },
        {
          model: Rank,
        },
      ],
    });
    return rs;
  }

  async createApplicableCustomer(data) {
    const rs = await ApplicableCustomer.create(data);
    return rs;
  }

  async updateApplicableCustomer(id, data) {
    const rs = await ApplicableCustomer.update(data, {
      where: {
        id: id,
      },
    });
    return rs;
  }

  async deleteApplicableCustomerByHeaderId(idHeader) {
    const rs = await ApplicableCustomer.destroy({
      where: {
        promotionHeader_id: idHeader,
      },
    });
    return rs;
  }

  async checkApplicablePromotionByTotalMoney({ date, rank_id, totalMoney }) {
    return await ApplicableCustomer.findAll({
      where: {
        rank_id: rank_id,
      },
      include: [
        {
          model: PromotionHeader,
          as: "promotionHeader",
          where: {
            statusPromotion: 1,
            startDate: {
              [Op.lte]: date,
            },
            endDate: {
              [Op.gte]: date,
            },
          },
          attributes: ["id"],
          include: [
            {
              model: PromotionLine,
              where: {
                status: 1,
                startDate: {
                  [Op.lte]: date,
                },
                endDate: {
                  [Op.gte]: date,
                },
              },
              include: [
                {
                  model: PromotionDetail,
                  where: {
                    total_purchase_amount: {
                      [Op.or]: [
                        {
                          [Op.lte]: totalMoney,
                        },
                        {
                          [Op.gte]: totalMoney,
                        },
                      ],
                    },
                  },
                  attributes: [
                    "id",
                    "IdProduct_buy",
                    "qty_buy",
                    "IdProduct_receive",
                    "qty_receive",
                    "total_purchase_amount",
                    "money_received",
                    "percent_reduction",
                    "max_money_reduction",
                  ],
                },
              ],
              attributes: [
                "id",
                "promotionCode",
                "type",
                "max_qty",
                "max_qty_per_customer_per_day",
                "budget",
              ],
            },
          ],
        },
      ],
      attributes: [],
    });
  }

  async checkApplicablePromotionByRankId({
    date,
    rank_id,
    totalMoney,
    idProductBuy,
    qtyBuy,
  }) {
    const condition = {};

    const rs = await ApplicableCustomer.findAll({
      where: {
        rank_id: rank_id,
      },
      include: [
        {
          model: PromotionHeader,
          as: "promotionHeader",
          where: {
            statusPromotion: 1,
            startDate: {
              [Op.lte]: date,
            },
            endDate: {
              [Op.gte]: date,
            },
          },
          attributes: ["id"],
          include: [
            {
              model: PromotionLine,
              where: {
                status: 1,
                startDate: {
                  [Op.lte]: date,
                },
                endDate: {
                  [Op.gte]: date,
                },
              },
              include: [
                {
                  model: PromotionDetail,
                  where: {
                    IdProduct_buy: idProductBuy,
                    qty_buy: {
                      [Op.or]: [
                        {
                          [Op.lte]: qtyBuy,
                        },
                        {
                          [Op.gte]: qtyBuy,
                        },
                      ],
                    },
                  },
                  attributes: [
                    "id",
                    "IdProduct_buy",
                    "qty_buy",
                    "IdProduct_receive",
                    "qty_receive",
                    "total_purchase_amount",
                    "money_received",
                    "percent_reduction",
                    "max_money_reduction",
                  ],
                },
              ],
              attributes: [
                "id",
                "promotionCode",
                "type",
                "max_qty",
                "max_qty_per_customer_per_day",
                "budget",
              ],
            },
          ],
        },
      ],
      attributes: [],
    });
    // console.log("idProductBuy", idProductBuy);
    // console.log("qtyBuy", qtyBuy);
    // console.log('RS',rs)
    return rs;
  }
}

module.exports = new ApplicableCustomerRepository();
