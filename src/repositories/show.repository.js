const Show = require("../models/Show");
const { Op } = require("sequelize");
const Cinema = require("../models/Cinema");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");
class ShowRepository {
  async getAllShow({ cinemaId, movieId, startDate, endDate }) {
    const where = {
      status: { [Op.ne]: 3 },
    };
    if (cinemaId) where["$Cinema.id$"] = cinemaId;
    if (movieId) where["$Movie.id$"] = movieId;
    if (startDate && endDate) {
      where.startDate = {
        [Op.between]: [startDate, endDate],
      };
    }
    return await Show.findAll({
      where: where,
      order: [["id", "DESC"]],
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
        {
          model: Movie,
          attributes: ["id", "nameMovie", "codeMovie"],
        },
        {
          model: CinemaHall,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "startDate", "endDate", "status", "code"],
    });
  }

  async getShowById(id) {
    return await Show.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
        {
          model: Movie,
          attributes: ["id", "nameMovie", "image", "duration"],
        },
        {
          model: CinemaHall,
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "showDate",
        "showTime",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });
  }

  async getShowByMovieId(req) {
    const id = req.params.movieId;
    const date = req.query.date;
    const datequery = new Date(date);
    return await Show.findAll({
      where: {
        idMovie: id,
        showDate: {
          [Op.eq]: datequery,
        },
      },
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
        {
          model: Movie,
          attributes: ["id", "nameMovie", "image"],
        },
        {
          model: CinemaHall,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "showDate", "showTime", "createdAt", "updatedAt"],
    });
  }

  async getShowByCinemaId(req) {
    const id = req.params.cinemaId;
    const date = req.query.date;
    const datequery = new Date(date);
    return await Show.findAll({
      where: {
        idCinema: id,
        showDate: {
          [Op.eq]: datequery,
        },
      },
      include: [
        {
          model: Cinema,
          attributes: ["id", "name"],
        },
        {
          model: Movie,
          attributes: ["id", "nameMovie", "image", "duration"],
        },
        {
          model: CinemaHall,
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "showDate", "showTime", "createdAt", "updatedAt"],
    });
  }

  async createShow(show) {
    return await Show.create(show);
  }

  async updateShow(id, show) {
    return await Show.update(show, {
      where: {
        id: id,
      },
    });
  }

  async deleteShow(id) {
    return await Show.destroy({
      where: {
        id: id,
      },
    });
  }

  async checkIsShowTimeExist(
    showTime,
    idMovie,
    idCinemaHall,
    showDate,
    idCinema
  ) {
    const isExist = await Show.findOne({
      where: {
        showDate: showDate,
        idMovie: idMovie,
        idCinemaHall: idCinemaHall,
        idCinema: idCinema,
        showTime: {
          [Op.eq]: showTime,
        },
      },
    });

    if (isExist) {
      return true;
    }
    return false;
  }
}

module.exports = new ShowRepository();
