const ShowMovie = require("../models/showMovie");
const Show = require("../models/Show");
const ShowTime = require("../models/showTime");
const { Op } = require("sequelize");
const CinemaHall = require("../models/CinemaHall");
const Cinema = require("../models/Cinema");
const Movie = require("../models/Movie");
const sequelize = require("../config/database");

const moment = require("moment");

class showMovieRepository {
  async create(showMovie) {
    return await ShowMovie.create(showMovie);
  }

  async getByShowId(idShow) {
    return await ShowMovie.findAll({
      where: {
        idShow: idShow,
      },
      order: [
        ["showDate", "ASC"],
        ["idShowTime", "ASC"],
      ],
      attributes: ["showDate", "status", "id"],
      include: [
        {
          model: ShowTime,
          attributes: ["id", "showTime"],
        },
      ],
    });
  }

  // async getByShowIdWithDate(idMovie, date) {
  //   const datequery = moment(date).format("YYYY-MM-DD");
  //   return await ShowMovie.findAll({
  //     where: {
  //       showDate: {
  //         [Op.eq]: datequery,
  //       },
  //     },
  //     order: [
  //       ["showDate", "ASC"],
  //       ["idShowTime", "ASC"],
  //     ],
  //     attributes: ["status", "id",'showDate'],
  //     include: [
  //       {
  //         model: ShowTime,
  //         attributes: ["id", "showTime"],
  //       },
  //       {
  //         model: Show,
  //         where: {
  //           idMovie: idMovie,
  //         },
  //         attributes: ["idMovie", "idCinema","idCinemaHall"],
  //       },
  //     ],
  //   });
  // }

  async getByShowIdWithDate(idMovie, date) {
    const datequery = moment(date).format("YYYY-MM-DD");
    return await ShowMovie.findAll({
      where: {
        showDate: {
          [Op.eq]: datequery,
        },
      },
      order: [
        ["showDate", "ASC"],
        ["idShowTime", "ASC"],
      ],
      attributes: ["status", "id",'showDate'],
      include: [
        {
          model: ShowTime,
          attributes: ["id", "showTime"],
        },
        {
          model: Show,
          where: {
            status: 1,
            idMovie: idMovie,
          },
          attributes: ["idMovie", "idCinema","idCinemaHall"],
        },
      ],
    });
  }

  async getByCinemaWithDate(idCinema, date) {
    const datequery = moment(date).format("YYYY-MM-DD");
    return await ShowMovie.findAll({
      where: {
        showDate: {
          [Op.eq]: datequery,
        },
      },
      order: [
        ["showDate", "ASC"],
        ["idShowTime", "ASC"],
      ],
      attributes: ["status", "id",'showDate'],
      include: [
        {
          model: ShowTime,
          attributes: ["id", "showTime"],
        },
        {
          model: Show,
          status: 1,
          where: {
            idCinema: idCinema,
          },
          attributes: ["idMovie", "idCinema","idCinemaHall"],
        },
      ],
    });
  }

  async checkShowMovieExisted(
    idCinema,
    idCinemaHall,
    showDate,
  ) {
    return await ShowMovie.findAll({
      include: [
        {
          model: Show,
          where: {
            status: 1,
            idCinema: idCinema,
            idCinemaHall: idCinemaHall,
          },
          attributes: ["id","code"],
          include: [
            {
              model: Movie,
              where: {
                status: 1,
              },
              attributes: ["id", "nameMovie", "codeMovie"],
            },
            {
              model: Cinema,
              where: {
                status: 1,
              },
              attributes: ["id", "name"],
            }
          ],
        },
        {
          model: ShowTime,
          attributes: ["id", "showTime"],
        }
      ],
      where: {
        showDate: showDate,
        // idShowTime: idShowTime,
      },
      attributes: [
        "showDate", "idShowTime", "idShow", "id",
        [sequelize.col("Show.Movie.id"), "idMovie"],
      ],
    });
  }

  async getShowMovieShowAndMovie({
    idCinema,
    showDate,
    idMovie,
  })
  {
    return await ShowMovie.findAll({
      include: [
        {
          model: Show,
          where: {
            idCinema: idCinema,
            idMovie: idMovie,
            status: 1,
          },
          attributes: ["idCinema", "idMovie"],
          include: [
            {
              model: CinemaHall,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      where: {
        showDate: showDate,
      },
      attributes: ["idShowTime","showDate"],
    });
  }

  async updateShowMovie(id, showMovie) {
    return await ShowMovie.update(showMovie, {
      where: {
        id: id,
      },
    });
  }

  async getSeatsByShowMovieId(id) {
    return await ShowMovie.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Show,
        },
      ],
    });
  }

  async deteteWithShowDate(idShow, showDate) {
    return await ShowMovie.destroy({
      where: {
        idShow: idShow,
        showDate: showDate,
      },
    });
  }


  async getByShowIdAndDate(idShow, showDate) {
    return await ShowMovie.findAll({
      where: {
        idShow: idShow,
        showDate: showDate,
      },
      include: [
        {
          model: ShowTime,
          attributes: ["id", "showTime"],
        },
      ],
      attributes: ["id"],
    });
  }

  async getListShowTimeIsPass({
    startDate,
    endDate,
    idCinema,
    idCinemaHall,
  }) {
    
  }

  async getShowTimeUnique(idShow) {
    return await ShowMovie.findAll({
      where: {
        idShow: idShow,
      },
      attributes: ["idShowTime"],
      group: ["idShowTime"],
    });
  }
}
module.exports = new showMovieRepository();
