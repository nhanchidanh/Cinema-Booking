const PriceHeader = require("../models/PriceHeader");
const Staff = require("../models/Staff");
const { Op } = require("sequelize");
class PriceHeaderRepository {
  async getAllPriceHeader({ start_date, end_date }) {
    const where = {
      status: { [Op.ne]: 3 },
    };
    if (start_date && end_date) {
      where.startDate = {
        [Op.between]: [start_date, end_date],
      };
      where.endDate = {
        [Op.between]: [start_date, end_date],
      };
    }

    return await PriceHeader.findAll({
      where: where,
      order: [["id", "DESC"]],
    });
  }

  async getPriceHeaderById(id) {
    return await PriceHeader.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Staff,
          as: "user_create",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Staff,
          as: "user_update",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  }

  async getPriceHeaderByName(name) {
    return await PriceHeader.findOne({
      where: {
        name: name,
      },
    });
  }

  async getPriceHeaderByCode(code) {
    return await PriceHeader.findOne({
      where: {
        priceCode: code,
      },
    });
  }

  async createPriceHeader(priceHeader) {
    return await PriceHeader.create(priceHeader);
  }

  async updatePriceHeader(id, priceHeader) {
    return await PriceHeader.update(priceHeader, {
      where: {
        id: id,
      },
    });
  }

  async deletePriceHeader(id) {
    return await PriceHeader.destroy({
      where: {
        id: id,
      },
    });
  }
}

module.exports = new PriceHeaderRepository();
