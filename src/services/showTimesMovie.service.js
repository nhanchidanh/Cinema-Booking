const showMovieRepository = require("../repositories/showMovie.repository");
const moment = require("moment");
const showTimeRepository = require("../repositories/showTime.repository");
const CinemaHallSeatRepository = require("../repositories/cinemaHallSeat.repository");
const redisDb = require("../config/redis");
const ShowService = require("./show.service");
const movieRepository = require("../repositories/movie.repository");

class showMovieService {
  async getByShowId(idShow) {
    const data = await showMovieRepository.getByShowId(idShow);

    data.map((item) => {
      item.dataValues.showTime = item.ShowTime.showTime;
      item.dataValues.idShowTime = item.ShowTime.id;
      delete item.dataValues.ShowTime;
    });
    const groupByDate = data.reduce((r, a) => {
      r[a.showDate] = [...(r[a.showDate] || []), a];
      return r;
    }, {});
    if (Object.keys(groupByDate).length === 0) {
      return null;
    }
    return groupByDate;
  }

  async getByShowIdWithDate(idMovie, date) {
    const data = await showMovieRepository.getByShowIdWithDate(idMovie, date);
    const currentTime = moment().format("HH:mm");
    const currentDate = moment().format("YYYY-MM-DD");
    const datequery = moment(date).format("YYYY-MM-DD");
    if (datequery === currentDate) {
      data.map(async (item, index) => {
        const time = item.ShowTime.showTime;
        const showTime = moment(time, "HH:mm").format("HH:mm");
        if (currentTime > showTime) {
          item.status = 0;
          await showMovieRepository.updateShowMovie(item.id, {
            status: 0,
          });
        }
      });
    } else if (datequery < currentDate) {
      data.map(async (item, index) => {
        item.status = 0;
        await showMovieRepository.updateShowMovie(item.id, {
          status: 0,
        });
      });
    }

    return data;
  }

  async getByCinemaWithDate(idCinema, date) {
    const data = await showMovieRepository.getByCinemaWithDate(idCinema, date);
    const currentTime = moment("HH:mm").format("HH:mm");
    const currentDate = moment().format("YYYY-MM-DD");
    const datequery = moment(date).format("YYYY-MM-DD");
    if (datequery === currentDate) {
      data.map(async (item, index) => {
        const time = item.ShowTime.showTime;
        console.log("time", time);
        const showTime = moment(time, "HH:mm").format("HH:mm");
        console.log("time", showTime);
        console.log("cr", currentTime);
        if (currentTime > showTime) {
          console.log("ok");
          item.status = 0;
          await showMovieRepository.updateShowMovie(item.id, {
            status: 0,
          });
        }
      });
    }

    return data;
  }

  async getSeatsByShowMovieId(id) {
    try {
      const data = await showMovieRepository.getSeatsByShowMovieId(id);
      if (!data) return [];
      const hall_id = data.Show.idCinemaHall;
      const seats =
        await CinemaHallSeatRepository.getCinemaHallSeatByCinemaHallId(hall_id);
      await Promise.all(
        seats.map(async (item) => {
          const seatCache = await redisDb.get(`${id}-${item.id}`);
          const seat = JSON.parse(seatCache);
          if (seat) {
            item.status = seat.status;
          }
        })
      );
      return seats;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deteteWithShowDate(id, date) {
    await showMovieRepository.deteteWithShowDate(id, date);
    return "Delete success";
  }
  async getByShowIdAndDate(idShow, date) {
    const data = await showMovieRepository.getByShowIdAndDate(idShow, date);
    return data;
  }

  async getShowMovieShowAndMovie(data) {
    let rs;
    let listShowTime = [];
    if (data.idMovie && data.showDate && data.idCinema) {
      rs = await showMovieRepository.getShowMovieShowAndMovie(data);
    }
    if (!rs) return [];

    for (let i = 0; i < rs.length; i++) {
      console.log("rs", rs[i]);
      const time = await showTimeRepository.getTime(rs[i].idShowTime);
      const { duration } = await movieRepository.getMovieById(
        rs[0].Show.idMovie
      );
      const showTime = moment(time.showTime, "HH:mm").format("HH:mm");
      const endTime = moment(time.showTime, "HH:mm")
        .add(duration, "minutes")
        .format("HH:mm");
      listShowTime.push({
        showDate: rs[i].showDate,
        showTime,
        endTime,
        hall: rs[i].Show.CinemaHall.name,
      });
    }

    return listShowTime;
  }

  async updateShowTimeByShowIdAndDate(idShow, data) {
    const { duration } = await movieRepository.getMovieById(data.idMovie);
    await showMovieRepository.deteteWithShowDate(idShow, data.showDate);

    let isExists = [];
    for (let i = 0; i < data.listTime.length; i++) {
      const isExist = await ShowService.checkIsShowTimeExist(
        data.idCinema,
        data.idCinemaHall,
        data.showDate
      );
      if (isExist.length > 0) {
        for (let k = 0; k < isExist.length; k++) {
          const { showTime } = await showTimeRepository.getTime(
            isExist[k].idShowTime
          );
          const timeInput = await showTimeRepository.getTime(data.listTime[i]);
          const betweenTime = Math.abs(
            moment(showTime, "HH:mm").diff(
              moment(timeInput.showTime, "HH:mm"),
              "minutes"
            )
          );
          if (betweenTime < duration) {
            isExists.push(isExist[k]);
          }
        }
      }
    }

    if (isExists.length === 0) {
      for (let j = 0; j < data.listTime.length; j++) {
        const showDate = moment(data.showDate).format("YYYY-MM-DD");
        await showMovieRepository.create({
          idShow: idShow,
          showDate: showDate,
          idShowTime: data.listTime[j],
        });
      }
    }
    return isExists;
  }

  async getShowTimeUnique(idShow) {
    const data = await showMovieRepository.getShowTimeUnique(idShow);
    return [...data.map((item) => item.idShowTime)];
  }
}
module.exports = new showMovieService();
