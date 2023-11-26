const Cinema = require("../models/Cinema");
const { Op } = require("sequelize");
const CinemaHall = require("../models/CinemaHall");
const sequelize = require("../config/database");

class CinameRepository {
  async getAllCinema({ keyword = "" }) {
    if (keyword) keyword = keyword?.trim();
    const where = {
      status: { [Op.ne]: 3 },
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          codeCinema: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    };
    return await Cinema.findAll({
      where: where,
      attributes: [
        "id",
        "codeCinema",
        "name",
        "descCinemaHall",
        "city_id",
        "district_id",
        "ward_id",
        "street",
        "status",
        "address",
      ],
      order: [["id", "DESC"]],
    });
  }

  async getCinemaById(id) {
    return await Cinema.findOne({
      where: {
        id: id,
      },
    });
  }

  async getCinemaByName(name) {
    return await Cinema.findOne({
      where: {
        name: name,
      },
    });
  }

  async createCinema(cinema) {
    return await Cinema.create(cinema);
  }

  async updateCinema(id, cinema) {
    return await Cinema.update(cinema, {
      where: {
        id: id,
      },
    });
  }

  async deleteCinema(id) {
    return await Cinema.destroy({
      where: {
        id: id,
      },
    });
  }

  async getCinemaByCode(code) {
    return await Cinema.findOne({
      where: {
        codeCinema: code,
      },
    });
  }

  async getCinemaActive() {
    return await Cinema.findAll({
      where: {
        status: 1,
      },
    });
  }
}

module.exports = new CinameRepository();
