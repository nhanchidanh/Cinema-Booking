const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const showMovie = require("../models/showMovie");
const showTime = require("../models/showTime");
const Movie = require("../models/Movie");
const CinemaHall = require("../models/CinemaHall");
const Cinema = require("../models/Cinema");
const Show = require("../models/Show");
const OrderDetail = require("../models/OrderDetail");
const CinemaHallSeat = require("../models/CinemaHallSeat");
const Product = require("../models/Product");
const { Op } = require("sequelize");

class OrderRepository {
  async getAll() {
    return await Order.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Staff,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: showMovie,
          attributes: ["id", "showDate"],
          include: [
            {
              model: showTime,
              attributes: ["id", "showTime"],
            },
          ],
        },
      ],
      attributes: ["id", "status", "totalPrice", "createdAt"],
    });
  }

  async getById(id) {
    return await Order.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Staff,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: showMovie,
          attributes: ["id", "showDate"],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Movie,
                  attributes: ["id", "nameMovie", "classify", "duration"],
                },
                {
                  model: CinemaHall,
                  attributes: ["id", "name", "type"],
                },
                {
                  model: Cinema,
                  attributes: [
                    "id",
                    "name",
                    "city_id",
                    "district_id",
                    "ward_id",
                    "street",
                    "address",
                  ],
                },
              ],
            },
            {
              model: showTime,
              attributes: ["id", "showTime"],
            },
          ],
        },
      ],
      attributes: [
        "id",
        "status",
        "totalPrice",
        "createdAt",
        "refundDate",
        "note",
        "totalDiscount",
        "code"
      ],
    });
  }

  async getByType(type, { start_date, end_date }) {
    const where = {};
    if (type === "1") {
      where.status = "1";
      if (start_date && end_date) {
        where.createdAt = {
          [Op.between]: [
            new Date(start_date),
            new Date(end_date + "T23:59:59.999Z"),
          ],
        };
      }
    } else if (type === "3") {
      where.status = "3";
      if ((start_date, end_date)) {
        where.refundDate = {
          [Op.between]: [
            new Date(start_date),
            new Date(end_date + "T23:59:59.999Z"),
          ],
        };
      }
    }

    return await Order.findAll({
      where: where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Staff,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: showMovie,
          attributes: ["id", "showDate"],
          include: [
            {
              model: showTime,
              attributes: ["id", "showTime"],
            },
          ],
        },
      ],
      attributes: [
        "id",
        "code",
        "status",
        "totalPrice",
        "createdAt",
        "refundDate",
        "note",
      ],
    });
  }

  async getByCustomerId(id) {
    return await Order.findAll({
      where: {
        idCustomer: id,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: showMovie,
          attributes: ["showDate"],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Movie,
                  attributes: [
                    "id",
                    "nameMovie",
                    "classify",
                    "duration",
                    "image",
                  ],
                },
                {
                  model: CinemaHall,
                  attributes: ["name", "type"],
                },
                {
                  model: Cinema,
                  attributes: ["name", "address"],
                },
              ],
            },
            {
              model: showTime,
              attributes: ["showTime"],
            },
          ],
        },
        {
          model: OrderDetail,
          attributes: [
            "id",
            "price",
            "qty",
            "qtyProduct",
            "priceProduct",
            "type",
          ],
          include: [
            {
              model: CinemaHallSeat,
              attributes: ["id", "seatColumn", "seatRow"],
            },
            {
              model: Product,
              attributes: ["id", "productCode", "productName"],
            },
          ],
        },
      ],
      attributes: [
        "id",
        "status",
        "paymentMethod",
        "note",
        "refundDate",
        "totalPrice",
        "totalDiscount",
        "createdAt",
      ],
    });
  }

  async getByStaffId(id) {
    return await Order.findAll({
      where: {
        idStaff: id,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Staff,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: showMovie,
          attributes: ["id", "showDate"],
          include: [
            {
              model: showTime,
              attributes: ["id", "showTime"],
            },
          ],
        },
      ],
      attributes: ["id", "status", "totalPrice", "createdAt"],
    });
  }

  async create(order) {
    return await Order.create(order);
  }

  async updateStatus(id, status) {
    return await Order.update(
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

  async update(id, order) {
    return await Order.update(order, {
      where: {
        id: id,
      },
    });
  }
}

module.exports = new OrderRepository();
