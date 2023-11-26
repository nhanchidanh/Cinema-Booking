const Movie = require("../models/Movie");
const CategoryMovie = require("../models/CategoryMovie");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

class MovieRepository {
  async getAllMovie({ keyword = "", startDate, endDate }) {
    if (keyword && keyword !== "") keyword = keyword.trim();
    const where = {
      status: { [Op.ne]: 3 },
      [Op.or]: [
        {
          nameMovie: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          "$category.nameCategory$": {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          codeMovie: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    };
    if (startDate) {
      where.releaseDate = {
        [Op.gte]: startDate,
      };
    }
    if (endDate) {
      where.releaseDate = {
        [Op.lte]: endDate,
      };
    }

    if (startDate && endDate) {
      where.releaseDate = {
        [Op.between]: [startDate, endDate],
      };
    }
    const data = await Movie.findAll({
      where: where,
      include: [
        {
          model: CategoryMovie,
          as: "category",
          attributes: ["id", "nameCategory"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return data;
  }

  async getMovieById(id) {
    return await Movie.findOne({
      where: {
        id: id,
      },
    });
  }

  async searchMovieByName(nameMovie) {
    return await Movie.findAll({
      // where: Sequelize.literal(`MATCH(nameMovie) AGAINST('${nameMovie}' IN NATURAL LANGUAGE MODE)`),
      where: {
        nameMovie: {
          [Sequelize.Op.like]: `%${nameMovie}%`,
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: CategoryMovie,
          as: "category",
          attributes: ["id", "nameCategory"],
        },
      ],
    });
  }

  async getMovieByCinemaId(id) {
    return await Movie.findAll({
      where: {
        idCinema: id,
      },
    });
  }

  async createMovie(movie) {
    return await Movie.create(movie);
  }

  async updateMovie(id, movie) {
    return await Movie.update(movie, {
      where: {
        id: id,
      },
    });
  }

  async deleteMovie(id) {
    return await Movie.destroy({
      where: {
        id: id,
      },
    });
  }

  async getDurationByMovieId(id) {
    return await Movie.findOne({
      where: {
        id: id,
      },
      attributes: ["duration"],
    });
  }

  async updateMovieStatus(id, status) {
    return await Movie.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async updateMovieActive(id, active) {
    return await Movie.update(
      {
        isActived: active,
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async getMovieByCode(codeMovie) {
    return await Movie.findOne({
      where: {
        codeMovie: codeMovie,
      },
    });
  }

  async getMovieByStatus(status) {
    return await Movie.findAll({
      where: {
        status: status,
      },
    });
  }
}

module.exports = new MovieRepository();
