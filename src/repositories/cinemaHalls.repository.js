const CinemaHall = require("../models/CinemaHall");
const Cinema = require("../models/Cinema");
const { Op } = require("sequelize");


class CinemaHallRepository {
  async getAllCinemaHall() {
    const data = await CinemaHall.findAll({
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return data;
  }

  async getCinemaHallById(id) {
    return await CinemaHall.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async getCinemaHallByName(name) {
    return await CinemaHall.findOne({
      where: {
        name: name,
      },
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async getCinemaHallByCinemaId(cinemaId, { keyword = "" }) {
    if (keyword && keyword !== "") keyword = keyword.trim();
    const where = {
      cinema_id: cinemaId,
      isDelete: false,
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          type: {
            [Op.like]: `%${keyword}%`,
          },
        }
      ],

    };
    return await CinemaHall.findAll({
      where: where,
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  async createCinemaHall(cinemaHall) {
    return await CinemaHall.create(cinemaHall);
  }

  async updateCinemaHall(id, cinemaHall) {
    return await CinemaHall.update(cinemaHall, {
      where: {
        id: id,
      },
    });
  }

  async deleteCinemaHall(id) {
    return await CinemaHall.destroy({
      where: {
        id: id,
      },
    });
  }

  async countHallByCinemaId(cinemaId) {
    return await CinemaHall.count({
      where: {
        isDelete: false,
        cinema_id: cinemaId,
      },
    });
  }
}

module.exports = new CinemaHallRepository();
