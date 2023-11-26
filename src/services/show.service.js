var axios = require("axios");
const ShowRepository = require("../repositories/show.repository");
const moment = require("moment");
const showMovieRepository = require("../repositories/showMovie.repository");
const ShowTimeRepository = require("../repositories/showTime.repository");
const e = require("express");
const movieRepository = require("../repositories/movie.repository");

class ShowService {
  getAllShow(query) {
    return ShowRepository.getAllShow(query);
  }

  async getShowById(id) {
    return await ShowRepository.getShowById(id);
  }

  async getShowByMovieId(req) {
    const data = await ShowRepository.getShowByMovieId(req);

    const currentDate = new Date().toLocaleTimeString();
    const currentTime = this.convertTime12to24(currentDate);

    let showTimesIsNull = [];
    data.forEach((item) => {
      let showTimes = [];

      item.showTime.forEach((time) => {
        if (time > currentTime) {
          showTimes.push(time);
        }
      });
      item.showTime = showTimes;

      if (item.showTime.length === 0) {
        showTimesIsNull.push(item);
      }
    });

    data.forEach((item) => {
      showTimesIsNull.forEach((item2) => {
        if (item.id === item2.id) {
          const i = data.indexOf(item);
          data.splice(i, 1);
        }
      });
    });

    return data;
  }

  async getShowByCinemaId(req) {
    const data = await ShowRepository.getShowByCinemaId(req);

    const currentDate = new Date().toLocaleTimeString();
    const currentTime = this.convertTime12to24(currentDate);

    let showTimesIsNull = [];

    data.forEach((item) => {
      let showTimes = [];

      item.showTime.forEach((time) => {
        if (time > currentTime) {
          showTimes.push(time);
        }
      });
      item.showTime = showTimes;

      if (item.showTime.length === 0) {
        showTimesIsNull.push(item);
      }
    });

    data.forEach((item) => {
      showTimesIsNull.forEach((item2) => {
        if (item.id === item2.id) {
          const i = data.indexOf(item);
          data.splice(i, 1);
        }
      });
    });

    return data;
  }

  // async createShow(show) {
  //   const arrShowTime = show.showTime;
  //   const arrCinemaHall = show.idCinemaHall;
  //   let startDate = moment(show.startDate, "YYYY-MM-DD");
  //   let endDate = moment(show.endDate, "YYYY-MM-DD");
  //   const movie = await movieRepository.getMovieById(show.idMovie);
  //   const duration = movie.duration;
  //   const endDateMovie = movie.endDate;
  //   const startDateMovie = movie.startDate;

  //   // if (startDate.isBefore(startDateMovie)) {
  //   //   throw new Error("Ngày bắt đầu phải sau hoặc bằng ngày khởi chiếu của phim");
  //   // }
  //   // if (endDate.isAfter(endDateMovie)) {
  //   //   throw new Error("Ngày kết thúc phải trước hoặc bằng ngày kết thúc của phim");
  //   // }

  //   // generate period start date to end date
  //   let dates = [];
  //   while (startDate.isSameOrBefore(endDate)) {
  //     dates.push(startDate.format("YYYY-MM-DD"));
  //     startDate.add(1, "days");
  //   }
  //   let isExists = [];
  //   for (let i = 0; i < dates.length; i++) {
  //     for (let l = 0; l < arrCinemaHall.length; l++) {
  //       for (let j = 0; j < arrShowTime.length; j++) {
  //         const showDate = moment(dates[i]).format("YYYY-MM-DD");
  //         const isExist = await this.checkIsShowTimeExist(
  //           show.idCinema,
  //           arrCinemaHall[l],
  //           showDate
  //         );
  //         if (isExist.length > 0) {
  //           for (let k = 0; k < isExist.length; k++) {
  //             const { showTime } = await ShowTimeRepository.getTime(
  //               isExist[k].idShowTime
  //             );
  //             const timeInput = await ShowTimeRepository.getTime(arrShowTime[j]);
  //             const betweenTime = Math.abs(
  //               moment(showTime, "HH:mm").diff(
  //                 moment(timeInput.showTime, "HH:mm"),
  //                 "minutes"
  //               )
  //             );
  //             if (betweenTime < duration) {
  //               isExists.push(isExist[k]);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (isExists.length === 0) {
  //     let shows = [];
  //     for ( let k = 0; k < arrCinemaHall.length; k++) {
  //       const { id } = await ShowRepository.createShow({
  //         startDate: show.startDate,
  //         endDate: show.endDate,
  //         idCinemaHall: arrCinemaHall[k],
  //         idMovie: show.idMovie,
  //         idCinema: show.idCinema,
  //       });
  //       shows.push(id);
  //     }
  //     for (let i = 0; i < dates.length; i++) {
  //       for (let l = 0; l < shows.length; l++) {
  //         for (let j = 0; j < arrShowTime.length; j++) {
  //           const showDate = moment(dates[i]).format("YYYY-MM-DD");
  //           await showMovieRepository.create({
  //             idShow: shows[l],
  //             showDate: showDate,
  //             idShowTime: arrShowTime[j],
  //           });
  //         }
  //       }
  //     }
  //   }
  //   return isExists;
  // }

  async createShow(show) {
    const arrShowTime = show.showTime;
    let startDate = moment(show.startDate, "YYYY-MM-DD");
    let endDate = moment(show.endDate, "YYYY-MM-DD");
    const { duration } = await movieRepository.getMovieById(show.idMovie);
    console.log(duration);

    // generate period start date to end date
    let dates = [];
    while (startDate.isSameOrBefore(endDate)) {
      dates.push(startDate.format("YYYY-MM-DD"));
      startDate.add(1, "days");
    }
    let isExists = [];

    await Promise.all(
      dates.map(async (date) => {
        const isExist = await this.checkIsShowTimeExist(
          show.idCinema,
          show.idCinemaHall,
          date
        );
        if (isExist.length > 0) {
          for (let i = 0; i < isExist.length; i++) {
            const { showTime } = await ShowTimeRepository.getTime(
              isExist[i].idShowTime
            );
            const timeInput = await ShowTimeRepository.getTime(arrShowTime[0]);
            const betweenTime = Math.abs(
              moment(showTime, "HH:mm").diff(
                moment(timeInput.showTime, "HH:mm"),
                "minutes"
              )
            );
            if (betweenTime < duration) {
              isExists.push(isExist[0]);
            }
          }
        }
      })
    );
    console.log(isExists);
    if (isExists.length === 0) {
      const { id } = await ShowRepository.createShow({
        startDate: show.startDate,
        endDate: show.endDate,
        idCinemaHall: show.idCinemaHall,
        idMovie: show.idMovie,
        idCinema: show.idCinema,
      });
      await Promise.all(
        dates.map(async (date) => {
          await Promise.all(
            arrShowTime.map(async (time) => {
              await showMovieRepository.create({
                idShow: id,
                showDate: date,
                idShowTime: time,
              });
            })
          );
        })
      );
    }

    isExists = isExists.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    return isExists;
  }

  async checkIsExist(show) {
    const arrShowTime = show.showTime;
    let startDate = moment(show.startDate, "YYYY-MM-DD");
    let endDate = moment(show.endDate, "YYYY-MM-DD");
    // const { duration } = await movieRepository.getMovieById(show.idMovie);

    // generate period start date to end date
    let dates = [];
    while (startDate.isSameOrBefore(endDate)) {
      dates.push(startDate.format("YYYY-MM-DD"));
      startDate.add(1, "days");
    }
    let isExists = [];
    for (let i = 0; i < dates.length; i++) {
      for (let j = 0; j < arrShowTime.length; j++) {
        const showDate = moment(dates[i]).format("YYYY-MM-DD");
        const isExist = await this.checkIsShowTimeExist(
          show.idCinema,
          show.idCinemaHall,
          showDate
        );
        if (isExist.length > 0) {
          for (let k = 0; k < isExist.length; k++) {
            const { showTime } = await ShowTimeRepository.getTime(
              isExist[k].idShowTime
            );
            const movie = await movieRepository.getMovieById(
              isExist[k].dataValues.idMovie
            );
            const endTime = moment(showTime, "HH:mm").add(
              movie.duration,
              "minutes"
            );
            isExist[k].dataValues.endTime = endTime.format("HH:mm");
            const timeInput = await ShowTimeRepository.getTime(arrShowTime[j]);
            const betweenTime = Math.abs(
              moment(showTime, "HH:mm").diff(
                moment(timeInput.showTime, "HH:mm"),
                "minutes"
              )
            );
            if (betweenTime < movie.duration) {
              isExists.push(isExist[k]);
            }
          }
        }
      }
    }
    isExists = isExists.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    return isExists;
  }

  async updateShow(id, show) {
    await ShowRepository.updateShow(id, show);
    return { message: "Update success" };
  }

  async updateStatusShow(id, { status }) {
    await ShowRepository.updateShow(id, { status: status });
    return { message: "Update success" };
  }

  async deleteShow(id) {
    await ShowRepository.updateShow(id, { status: 3 });
    return { message: "Delete success" };
  }

  async checkIsShowTimeExist(idCinema, idCinemaHall, showDate) {
    const rs = await showMovieRepository.checkShowMovieExisted(
      idCinema,
      idCinemaHall,
      showDate
    );
    if (rs) {
      return rs;
    } else {
      return null;
    }
  }

  async checkShowTimeIsPassed(id) {
    const data = await ShowRepository.getShowById(id);
    const currentDateTime = new Date().toLocaleTimeString();
    const currentTime = this.convertTime12to24(currentDateTime);
    const currentDate = moment().format("YYYY-MM-DD");
    const showDate = moment(data.showDate).format("YYYY-MM-DD");
    const showTime = this.convertTime12to24(data.showTime);
    const duration = data.Movie.duration + 30;
    const endTime = moment(showTime, "HH:mm")
      .add(duration, "minutes")
      .format("HH:mm");

    console.log("showTime", showTime);
    console.log("crTime", currentTime);
    console.log("endTime", endTime);
    if (showDate === currentDate) {
      if (showTime < currentTime) {
        return 3;
      } else if (currentTime > showTime && currentTime < endTime) {
        return 1;
      } else if (showTime > currentTime && endTime > currentTime) {
        return 2;
      }
    } else if (showDate < currentDate) {
      return 3;
    } else if (showDate > currentDate) {
      return 2;
    }
  }

  convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }

  async getListShowTimeIsPass({
    startDateIn,
    endDateIn,
    idCinema,
    idCinemaHall,
    idMovie,
  }) {
    const showTimes = await ShowTimeRepository.getShowTimes();
    const listTime = showTimes.map((item) => {
      return {
        id: item.id,
        showTime: item.showTime,
      };
    });

    let startDate = moment(startDateIn, "YYYY-MM-DD");
    let endDate = moment(endDateIn, "YYYY-MM-DD");
    // const { duration } = await movieRepository.getMovieById(idMovie);
    // generate period start date to end date
    let dates = [];
    while (startDate.isSameOrBefore(endDate)) {
      dates.push(startDate.format("YYYY-MM-DD"));
      startDate.add(1, "days");
    }
    let showTimesIsPass = [];
    let isExists = [];
    for (let i = 0; i < dates.length; i++) {
      const showDate = moment(dates[i]).format("YYYY-MM-DD");
      const isExist = await this.checkIsShowTimeExist(
        idCinema,
        idCinemaHall,
        showDate
      );
      isExists.push(...isExist);
    }

    if (isExists.length === 0) {
      return 0;
    }

    isExists = isExists.reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);


    const showTimesCurrent = isExists.map((item) => item.ShowTime.showTime);
    const movies_id = isExists.map((item) => item.dataValues.idMovie);
    const { duration } = await movieRepository.getMovieById(movies_id[0]);
    // console.log("showTimesCurrent", showTimesCurrent);


    const showUnique = [...new Set(showTimesCurrent.filter(
      (e, i, a) => a.indexOf(e) === i
    ))];
    // console.log("showUnique", showUnique);

    showUnique.sort((a, b) => {
      return moment(a, "HH:mm").diff(moment(b, "HH:mm"));
    });


    showUnique.forEach((showTime) => {
      const showTimeTmp = [];
      listTime.forEach((item) => {
        const timeInput = item.showTime;
        const betweenTime = Math.abs(
          moment(showTime, "HH:mm").diff(moment(timeInput, "HH:mm"), "minutes")
        );
        if (betweenTime < duration) {
          showTimeTmp.push(item);
        }
      });
      showTimesIsPass.push(...showTimeTmp);
    });


    const map = showTimesIsPass.map((item) => item.showTime);

    const showDuplicate = new Set(map);
    const newArr = listTime.filter((item) => {
      return !showDuplicate.has(item.showTime);
    });

    return newArr;
  }
}

module.exports = new ShowService();
