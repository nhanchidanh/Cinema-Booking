const CinemaHallSeat = require("../models/CinemaHallSeat");
const Product = require("../models/Product");

class CinemaHallSeatRepository {
  async getAllCinemaHallSeat() {
    return await CinemaHallSeat.findAll();
  }

  async getCinemaHallSeatById(id) {
    return await CinemaHallSeat.findOne({
      where: {
        id: id,
      },
    });
  }

  async getCinemaHallSeatByCinemaHallId(id) {
    return await CinemaHallSeat.findAll({
      where: {
        idCinemaHall: id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "productName", "typeSeat"],
        },
      ],
      attributes: ["id", "seatRow", "seatColumn", "statusSeat", "status","idCinemaHall"],
    });
  }

  async createCinemaHallSeat(cinemaHallSeat) {
    return await CinemaHallSeat.create(cinemaHallSeat);
  }

  async updateCinemaHallSeat(id, cinemaHallSeat) {
    return await CinemaHallSeat.update(cinemaHallSeat, {
      where: {
        id: id,
      },
    });
  }

  async deleteCinemaHallSeat(id) {
    return await CinemaHallSeat.destroy({
      where: {
        id: id,
      },
    });
  }

  // async getSeatsByShowTimeId({
  //   date,
  //   idShowTime,
  //   idCinemaHall,
  //   idMovie,
  //   idCinema,
  // }) {
  //   const seats = await CinemaHallSeat.findAll({
  //     where: {
  //       idCinemaHall: idCinemaHall,
  //     },
  //     include: [
  //       {
  //         model: Product,
  //         attributes: ["id", "productName", "typeSeat"],
  //         include: [
  //           {
  //             model: Ticket,
  //             attributes: ["id"],
  //             include: [
  //               {
  //                 model: ShowTime,
  //                 attributes: ["id"],
  //                 include: [
  //                   {
  //                     model: Movie,
  //                     attributes: ["id"],
  //                     where: {
  //                       id: idMovie,
  //                     },
  //                   },
  //                   {
  //                     model: Cinema,
  //                     attributes: ["id"],
  //                     where: {
  //                       id: idCinema,
  //                     },
  //                   },
  //                   {
  //                     model: ShowTimeDate,
  //                     attributes: ["id"],
  //                     where: {
  //                       date: date,
  //                     },
  //                   },
  //                   {
  //                     model: ShowTimeTime,
  //                     attributes: ["id"],
  //                     where: {
  //                       id: idShowTime,
  //                     },
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     attributes: ["id", "seatRow", "seatColumn", "statusSeat", "status"],
  //   });
  //   return seats;
  // }
}

module.exports = new CinemaHallSeatRepository();