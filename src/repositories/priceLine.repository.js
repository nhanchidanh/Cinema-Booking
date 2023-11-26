const PriceLine = require("../models/PriceLine");
const Product = require("../models/Product");
const PriceHeader = require("../models/PriceHeader");
const moment = require("moment");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const Staff = require("../models/Staff");
class PriceLineRepository {
  async getAllPriceLine() {
    const data = await PriceLine.findAll({
      include: [
        {
          model: Product,
        },
      ],
      astributes: ["id", "price", "idPriceHeader", "createdAt", "updatedAt"],
    });
    return data;
  }

  async getPriceLineById(id) {
    return await PriceLine.findOne({
      where: {
        id: id,
      },
    });
  }

  async getPriceLineByPriceHeaderId(id) {
    return await PriceLine.findAll({
      where: {
        idPriceHeader: id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "productCode", "productName"],
        },
      ],
      attributes: ["id", "price"],
    });
  }

  async createPriceLine(priceLine) {
    return await PriceLine.create(priceLine);
  }

  async updatePriceLine(id, priceLine) {
    return await PriceLine.update(priceLine, {
      where: {
        id: id,
      },
    });
  }

  async deletePriceLine(id) {
    return await PriceLine.destroy({
      where: {
        id: id,
      },
    });
  }

  async getPriceByProduct(idProduct) {
    const currentDate = moment().format("YYYY-MM-DD");
    const data = await PriceLine.findOne({
      attributes: ["price"],
      include: [
        {
          model: PriceHeader,
          where: {
            status: 1,
            startDate: {
              [Op.lte]: currentDate,
            },
            endDate: {
              [Op.gte]: currentDate,
            },
          },
          attributes: ["id"],
        },
      ],
      where: {
        idProduct: idProduct,
      },
    });
    return data;
  }

  async checkPriceLine(body) {
    const startDateCheck = moment(body.startDate).format("YYYY-MM-DD");
    const endDateCheck = moment(body.endDate).format("YYYY-MM-DD");
    console.log(startDateCheck);
    console.log(endDateCheck);
    return await PriceLine.findAll({
      include: [
        {
          model: PriceHeader,
          where: {
            status: 1,
            startDate: {
              [Op.lte]: endDateCheck,
            },
            endDate: {
              [Op.gte]: startDateCheck,
            },
          },
          attributes: ["id", "priceCode", "name", "startDate", "endDate"],
        },
        {
          model: Product,
          attributes: ["id", "productCode", "productName"],
        },
      ],
      where: {
        idProduct: body.idProduct,
      },
      attributes: ["id", "price"],
    });
  }

  async lineIsExist(idProduct, idPriceHeader) {
    return await PriceLine.findOne({
      where: {
        idProduct: idProduct,
        idPriceHeader: idPriceHeader,
      },
      include: [
        {
          model: PriceHeader,
          attributes: ["id", "name", "startDate", "endDate"],
        },
        {
          model: Product,
          attributes: ["id", "productCode", "productName"],
        },
      ],
      attributes: ["id", "price"],
    });
  }
}

module.exports = new PriceLineRepository();
