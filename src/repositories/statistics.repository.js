const { Op } = require("sequelize");
const sequelize = require("../config/database");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Staff = require("../models/Staff");
const PromotionResult = require("../models/PromotionResult");
const showMovie = require("../models/showMovie");
const Cinema = require("../models/Cinema");
const Show = require("../models/Show");
const Movie = require("../models/Movie");
const CategoryMovie = require("../models/CategoryMovie");
const Rank = require("../models/Rank");
const PromotionLine = require("../models/PromotionLine");
const OrderDetail = require("../models/OrderDetail");
const moment = require("moment");
const showTime = require("../models/showTime");
const Product = require("../models/Product");
const CinameRepository = require("./cinema.repository");
const cinemaRepository = require("./cinema.repository");
const PromotionDetail = require("../models/PromotionDetail");

class StatisticsRepository {
  async GetTop5CustomersInMonth() {
    const currentMonth = new Date().getMonth() + 1;
    const data = await Order.findAll({
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
            currentMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
            new Date().getFullYear()
          ),
        ],
        status: 1,
        idCustomer: { [Op.ne]: 36 },
      },

      group: ["idCustomer"],
      order: [["totalPrice", "DESC"]],
      limit: 5,
      include: [
        {
          model: Customer,
          as: "Customer",
          where: {
            isDeleted: 0,
          },
          attributes: ["id", "firstName", "lastName", "code"],
          include: [
            {
              model: Rank,
              attributes: ["id", "nameRank"],
            },
          ],
        },
      ],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "totalPrice"],
        // [sequelize.fn("SUM", sequelize.col("OrderDetails")), "countOrder"],
        "idCustomer",
      ],
    });
    return data;
  }

  async GetTop5MoviesInMonth() {
    const currentMonth = new Date().getMonth() + 1;

    const data = await Order.findAll({
      where: {
        status: 1,
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
            currentMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
            new Date().getFullYear()
          ),
        ],
      },
      group: [[sequelize.col("ShowMovie.Show.Movie.id")]],
      order: [["totalPrice", "DESC"]],

      include: [
        {
          model: showMovie,
          attributes: [],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Movie,
                  attributes: ["id", "codeMovie", "nameMovie"],
                  include: [
                    {
                      model: CategoryMovie,
                      as: "category",
                      attributes: ["id", "nameCategory"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      attributes: [
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "totalPrice"],
        [sequelize.col("ShowMovie.Show.Movie.id"), "idMovie"],
        [sequelize.col("ShowMovie.Show.Movie.nameMovie"), "nameMovie"],
        [sequelize.col("ShowMovie.Show.Movie.codeMovie"), "codeMovie"],
        [
          sequelize.col("ShowMovie.Show.Movie.category.nameCategory"),
          "category",
        ],
      ],
    });
    return data;
  }

  async GetRevenueByStaff({
    cinema_id = "",
    start_date = "",
    end_date = "",
    staff_id = "",
  }) {
    const where = {
      status: 1,
    };
    if (cinema_id) where["$Staff.cinema_id$"] = cinema_id;
    if (staff_id) where.idStaff = staff_id;
    if (start_date || end_date) where["createdAt"] = {};
    if (start_date) where["createdAt"][Op.gte] = new Date(start_date);
    if (end_date)
      where["createdAt"][Op.lte] = new Date(end_date + "T23:59:59.999Z");
    const data = await Order.findAll({
      where: where,
      group: [
        [sequelize.fn("DATE", sequelize.col("Order.createdAt"))],
        "idStaff",
      ],
      include: [
        {
          model: Staff,
          attributes: ["id", "code", "firstName", "lastName", "cinema_id"],
        },
      ],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "total"],
        [sequelize.fn("SUM", sequelize.col("Order.totalDiscount")), "discount"],
        "idStaff",
        "createdAt",
      ],
      order: [
        ["idStaff", "ASC"],
        ["createdAt", "ASC"],
      ],
    });
    data.map((item) => {
      let totalDiscount = item.dataValues.total;
      let discount = 0;
      if (item.dataValues.discount) {
        totalDiscount += item.dataValues.discount;
        discount = item.dataValues.discount;
      }
      item.dataValues.discount = discount;
      item.dataValues.totalDiscount = totalDiscount;
      item.dataValues.total = item.dataValues.total;
      delete item.dataValues.PromotionResults;
      return item;
    });
    return data;
  }

  async GetRevenueByCustomer({
    cinema_id = "",
    start_date = "",
    end_date = "",
    customer_id = "",
  }) {
    const where = {
      status: 1,
    };
    if (cinema_id) where["$ShowMovie.Show.Cinema.id$"] = cinema_id;
    if (customer_id) where.idCustomer = customer_id;
    if (start_date || end_date) where["createdAt"] = {};
    if (start_date) where["createdAt"][Op.gte] = new Date(start_date);
    if (end_date)
      where["createdAt"][Op.lte] = new Date(end_date + "T23:59:59.999Z");
    const data = await Order.findAll({
      where: where,
      group: [
        [sequelize.fn("DATE", sequelize.col("Order.createdAt"))],
        "idCustomer",
      ],
      include: [
        {
          model: Customer,
          as: "Customer",
          attributes: [
            "id",
            "code",
            "firstName",
            "lastName",
            "phone",
            "city_id",
            "district_id",
            "ward_id",
            "rank_id",
            "address",
          ],
          include: [
            {
              model: Rank,
              attributes: ["id", "nameRank"],
            },
          ],
        },
        {
          model: showMovie,
          attributes: ["id"],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Cinema,
                  attributes: ["id", "name"],
                },
              ],
            },
          ],
        },
      ],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "total"],
        [sequelize.fn("SUM", sequelize.col("Order.totalDiscount")), "discount"],
        [sequelize.fn("COUNT", sequelize.col("Customer.id")), "totalOrder"],
        "createdAt",
      ],
      order: [
        ["idCustomer", "ASC"],
        ["createdAt", "ASC"],
      ],
    });
    data.map((item) => {
      let totalDiscount = item.dataValues.total;
      let discount = 0;
      if (item.dataValues.discount) {
        totalDiscount += item.dataValues.discount;
        discount = item.dataValues.discount;
      }
      item.dataValues.discount = discount;
      item.dataValues.totalDiscount = totalDiscount;
      item.dataValues.total = item.dataValues.total;
      delete item.dataValues.ShowMovie;
      return item;
    });
    return data;
  }

  async GetRevenueByMovie({ start_date = "", end_date = "", movie_id = "" }) {
    const where = {
      status: 1,
    };
    if (movie_id) where["$ShowMovie.Show.Movie.id$"] = movie_id;
    if (start_date || end_date) where["createdAt"] = {};
    if (start_date) where["createdAt"][Op.gte] = new Date(start_date);
    if (end_date)
      where["createdAt"][Op.lte] = new Date(end_date + "T23:59:59.999Z");

    const data = await Order.findAll({
      where: where,
      group: [
        [sequelize.fn("DATE", sequelize.col("Order.createdAt"))],
        [sequelize.col("ShowMovie.Show.Movie.id")],
      ],
      include: [
        {
          model: showMovie,
          attributes: ["id"],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Movie,
                  attributes: [
                    "id",
                    "codeMovie",
                    "nameMovie",
                    "idCategoryMovie",
                  ],
                  include: [
                    {
                      model: CategoryMovie,
                      as: "category",
                      attributes: ["id", "nameCategory"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],

      attributes: [
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "total"],
        [sequelize.fn("SUM", sequelize.col("Order.totalDiscount")), "discount"],
        [sequelize.col("ShowMovie.Show.Movie.id"), "movie_id"],
        [sequelize.fn("SUM", sequelize.col("Order.numberSeat")), "count"],
        "createdAt",
      ],
      order: [
        ["movie_id", "ASC"],
        ["createdAt", "ASC"],
      ],
    });
    data.map((item) => {
      let totalDiscount = item.dataValues.total;
      let discount = 0;
      if (item.dataValues.discount) {
        totalDiscount += item.dataValues.discount;
        discount = item.dataValues.discount;
      }
      item.dataValues.discount = discount;
      item.dataValues.count = Number(item.dataValues.count);
      item.dataValues.totalDiscount = totalDiscount;
      item.dataValues.total = item.dataValues.total;
      item.dataValues.movie = item.dataValues.ShowMovie.Show.Movie;
      delete item.dataValues.ShowMovie;
      return item;
    });
    return data;
  }

  async GetRevenueByPromotionLine({
    start_date,
    end_date,
    promotion_code,
    promotion_type,
  }) {
    let where = {
      status: 1,
    };
    if (promotion_code) where["$PromotionLine.promotionCode$"] = promotion_code;
    if (promotion_type) where["$PromotionLine.type$"] = promotion_type;
    if (start_date || end_date) where["createdAt"] = {};
    if (start_date) where["createdAt"][Op.gte] = new Date(start_date);
    if (end_date)
      where["createdAt"][Op.lte] = new Date(end_date + "T23:59:59.999Z");
    const data = await PromotionResult.findAll({
      where: where,
      group: ["PromotionLine.id"],
      include: [
        {
          model: PromotionLine,
          attributes: [
            "id",
            "promotionCode",
            "desc",
            "type",
            "startDate",
            "endDate",
            "budget",
          ],
          include: [
            {
              model: PromotionDetail,
              attributes: [],
            },
          ],
        },
      ],
      attributes: [
        [
          sequelize.fn("SUM", sequelize.col("PromotionResult.moneyDiscount")),
          "totalUsed",
        ],
        [sequelize.fn("COUNT", sequelize.col("PromotionResult.id")), "count"],
        [
          sequelize.col("PromotionLine.PromotionDetail.max_money_reduction"),
          "discount",
        ],
      ],
    });
    return data;
  }

  async GetRefundOrder({ start_date = "", end_date = "", type_seat = "" }) {
    const where = {
      status: 3,
    };
    if (type_seat) where["$OrderDetails.Product.typeSeat$"] = type_seat;
    if (start_date || end_date) where["refundDate"] = {};
    if (start_date) where["refundDate"][Op.gte] = new Date(start_date);
    if (end_date)
      where["refundDate"][Op.lte] = new Date(end_date + "T23:59:59.999Z");

    const data = await Order.findAll({
      where: where,
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
      attributes: [
        "id",
        "refundDate",
        "createdAt",
        "totalPrice",
        "totalDiscount",
      ],

      order: [["refundDate", "DESC"]],
    });
    data.map((item) => {
      const qty = item.dataValues.OrderDetails.reduce((a, b) => {
        return a + b.dataValues.qty;
      }, 0);
      const qtyPrice = item.dataValues.OrderDetails.reduce((a, b) => {
        return a + b.dataValues.qtyProduct;
      }, 0);
      item.dataValues.id = item.dataValues.id;
      item.dataValues.refundDate = item.dataValues.refundDate;
      item.dataValues.createdAt = item.dataValues.createdAt;
      item.dataValues.qty = qty + qtyPrice;
      delete item.dataValues.OrderDetails;
      return item;
    });
    return data;
  }

  async GetRevenueByShowtime({ idMovie, date }) {
    const where = {
      status: 1,
      "$ShowMovie.Show.Movie.id$": idMovie,
      createdAt: {
        [Op.gte]: new Date(date),
        [Op.lte]: new Date(date + "T23:59:59.999Z"),
      },
    };
    const data = await Order.findAll({
      where: where,
      group: [[sequelize.col("ShowMovie.ShowTime.id")]],
      include: [
        {
          model: showMovie,
          attributes: ["id"],
          include: [
            {
              model: Show,
              attributes: ["id"],
              include: [
                {
                  model: Movie,
                  attributes: ["id"],
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
        [sequelize.fn("SUM", sequelize.col("Order.totalPrice")), "total"],
        [sequelize.fn("SUM", sequelize.col("Order.totalDiscount")), "discount"],
        [
          sequelize.fn("COUNT", sequelize.col("ShowMovie.ShowTime.id")),
          "count",
        ],
        [sequelize.col("ShowMovie.ShowTime.showTime"), "time"],
      ],
      order: [["time", "ASC"]],
    });
    data.map((item) => {
      let totalDiscount = item.dataValues.total;
      let discount = 0;
      if (item.dataValues.discount) {
        totalDiscount += item.dataValues.discount;
        discount = item.dataValues.discount;
      }
      item.dataValues.discount = discount;
      item.dataValues.totalDiscount = totalDiscount;
      item.dataValues.total = item.dataValues.total;
      delete item.dataValues.ShowMovie;
      return item;
    });
    return data;
  }

  async GetRefundOrderDetail({ idOrder }) {
    const where = {
      idOrder: idOrder,
    };
    const data = await OrderDetail.findAll({
      where: where,
      group: [
        [sequelize.col("Product.typeSeat")],
        [sequelize.col("Product.id")],
      ],
      include: [
        {
          model: Product,
          attributes: ["id", "productCode", "type", "productName", "typeSeat"],
        },
      ],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("qty")), "qty"],
        [sequelize.fn("SUM", sequelize.col("qtyProduct")), "qtyProduct"],
        [sequelize.fn("SUM", sequelize.col("price")), "price"],
        [sequelize.fn("SUM", sequelize.col("priceProduct")), "priceProduct"],
      ],
    });
    data.map((item) => {
      item.dataValues.total =
        item.dataValues.price || item.dataValues.priceProduct;
      item.dataValues.amount =
        item.dataValues.qty || item.dataValues.qtyProduct;
      delete item.dataValues.price;
      delete item.dataValues.priceProduct;
      delete item.dataValues.qtyProduct;
      delete item.dataValues.qty;
      return item;
    });
    return data;
  }

  async GetRatioDashboardInMonth(month) {
    let statistic_revenue = 0;
    let qty_new_user = 0;
    let qty_ticket = 0;
    let qty_order_refund = 0;

    let ratio_revenue = 0;
    let ratio_new_user = 0;
    let ratio_ticket = 0;
    let ratio_order_refund = 0;

    let rs_revenue = 0;
    let rs_new_user = 0;
    let rs_ticket = 0;
    let rs_order_refund = 0;

    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth - 1;

    const getStatistic = async (month) => {
      const data_revenue = await Order.findAll({
        where: {
          status: 1,
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
              new Date().getFullYear()
            ),
          ],
        },
        attributes: [
          [sequelize.fn("SUM", sequelize.col("totalPrice")), "total"],
        ],
      });

      const data_new_user = await Customer.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("Customer.createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("Customer.createdAt")),
              new Date().getFullYear()
            ),
          ],
          isDeleted: 0,
          isActivated: 1,
        },
        attributes: [[sequelize.fn("COUNT", sequelize.col("id")), "total"]],
      });

      const data_ticket = await OrderDetail.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("OrderDetail.createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("OrderDetail.createdAt")),
              new Date().getFullYear()
            ),
          ],
        },
        include: [
          {
            model: Order,
            attributes: [],
            where: {
              status: 1,
            },
          },
        ],
        attributes: [[sequelize.fn("SUM", sequelize.col("qty")), "total"]],
      });

      const data_order_refund = await OrderDetail.findAll({
        where: {
          [Op.and]: [
            sequelize.where(
              sequelize.fn("MONTH", sequelize.col("OrderDetail.createdAt")),
              month
            ),
            sequelize.where(
              sequelize.fn("YEAR", sequelize.col("OrderDetail.createdAt")),
              new Date().getFullYear()
            ),
          ],
        },
        include: [
          {
            model: Order,
            attributes: [],
            where: {
              status: 3,
            },
          },
        ],
        attributes: [[sequelize.fn("SUM", sequelize.col("qty")), "total"]],
      });

      return {
        data_revenue: data_revenue,
        data_new_user: data_new_user,
        data_ticket: data_ticket,
        data_order_refund: data_order_refund,
      };
    };

    await Promise.all([
      getStatistic(currentMonth),
      getStatistic(previousMonth),
    ]).then((values) => {
      const data_revenue_current = values[0].data_revenue[0].dataValues.total;
      const data_revenue_previous = values[1].data_revenue[0].dataValues.total;
      const data_new_user_current = values[0].data_new_user[0].dataValues.total;
      const data_new_user_previous =
        values[1].data_new_user[0].dataValues.total;
      const data_ticket_current = values[0].data_ticket[0].dataValues.total;
      const data_ticket_previous = values[1].data_ticket[0].dataValues.total;
      const data_order_refund_current =
        values[0].data_order_refund[0].dataValues.total;
      const data_order_refund_previous =
        values[1].data_order_refund[0].dataValues.total;

      statistic_revenue = data_revenue_current;
      qty_new_user = data_new_user_current;
      qty_ticket = data_ticket_current;
      qty_order_refund = data_order_refund_current;

      ratio_revenue = Math.round(
        ((data_revenue_current - data_revenue_previous) /
          data_revenue_previous) *
          100
      );
      rs_revenue = data_revenue_current - data_revenue_previous;
      if (rs_revenue > 0) {
        rs_revenue = rs_revenue;
      } else {
        rs_revenue = 0;
      }
      if (ratio_revenue > 0) {
        ratio_revenue = ratio_revenue;
      } else {
        ratio_revenue = 0;
      }

      ratio_new_user = Math.round(
        ((data_new_user_current - data_new_user_previous) /
          data_new_user_previous) *
          100
      );
      rs_new_user = data_new_user_current - data_new_user_previous;
      if (rs_new_user > 0) {
        rs_new_user = rs_new_user;
      } else {
        rs_new_user = 0;
      }

      if (ratio_new_user > 0) {
        ratio_new_user = ratio_new_user;
      } else {
        ratio_new_user = 0;
      }

      ratio_ticket = Math.round(
        ((data_ticket_current - data_ticket_previous) / data_ticket_previous) *
          100
      );
      rs_ticket = data_ticket_current - data_ticket_previous;
      if (rs_ticket > 0) {
        rs_ticket = rs_ticket;
      } else {
        rs_ticket = 0;
      }

      if (ratio_ticket > 0) {
        ratio_ticket = ratio_ticket;
      } else {
        ratio_ticket = 0;
      }

      ratio_order_refund = Math.round(
        ((data_order_refund_current - data_order_refund_previous) /
          data_order_refund_previous) *
          100
      );
      rs_order_refund = data_order_refund_current - data_order_refund_previous;
      if (rs_order_refund > 0) {
        rs_order_refund = rs_order_refund;
      } else {
        rs_order_refund = 0;
      }
      if (ratio_order_refund > 0) {
        ratio_order_refund = ratio_order_refund;
      } else {
        ratio_order_refund = 0;
      }
    });

    return {
      statistic_revenue: statistic_revenue,
      qty_new_user: qty_new_user,
      qty_ticket: qty_ticket,
      qty_order_refund: qty_order_refund,
      ratio_revenue: ratio_revenue,
      ratio_new_user: ratio_new_user,
      ratio_ticket: ratio_ticket,
      ratio_order_refund: ratio_order_refund,
      rs_revenue: rs_revenue,
      rs_new_user: rs_new_user,
      rs_ticket: rs_ticket,
      rs_order_refund: rs_order_refund,
    };
  }

  async GetRevenueInWeek(date) {
    return await Order.findAll({
      where: {
        status: 1,
        createdAt: {
          [Op.gte]: new Date(date),
          [Op.lte]: new Date(date + "T23:59:59.999Z"),
        },
      },
      attributes: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "total"]],
    });
  }

  async GetTotalPercentUsersInMonth() {
    const currentMonth = new Date().getMonth() + 1;
    const totalUserOf = await Order.findAll({
      where: {
        status: 1,
        paymentMethod: 0,
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
            currentMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
            new Date().getFullYear()
          ),
        ],
      },
      include: [
        {
          model: Customer,
          as: "Customer",
          where: {
            isDeleted: 0,
          },
          attributes: [],
        },
      ],
      attributes: [[sequelize.fn("COUNT", sequelize.col("Order.id")), "total"]],
    });

    const totalUserOnline = await Order.findAll({
      where: {
        status: 1,
        paymentMethod: 1,
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
            currentMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
            new Date().getFullYear()
          ),
        ],
      },
      include: [
        {
          model: Customer,
          as: "Customer",
          where: {
            isDeleted: 0,
          },
          attributes: [],
        },
      ],
      attributes: [[sequelize.fn("COUNT", sequelize.col("Order.id")), "total"]],
    });

    const totalUser =
      totalUserOf[0].dataValues.total + totalUserOnline[0].dataValues.total;
    const percentUserOf = Math.round(
      (totalUserOf[0].dataValues.total / totalUser) * 100
    );
    const percentUserOnline = Math.round(
      (totalUserOnline[0].dataValues.total / totalUser) * 100
    );

    return {
      percentUserOf: percentUserOf,
      percentUserOnline: percentUserOnline,
    };
  }

  async GetRevenueByCustomerInMonth(id) {
    const currentMonth = new Date().getMonth() + 1;
    return await Order.findAll({
      where: {
        status: 1,
        idCustomer: id,
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("Order.createdAt")),
            currentMonth
          ),
          sequelize.where(
            sequelize.fn("YEAR", sequelize.col("Order.createdAt")),
            new Date().getFullYear()
          ),
        ],
      },
      attributes: [[sequelize.fn("SUM", sequelize.col("totalPrice")), "total"]],
    });
  }
}

module.exports = new StatisticsRepository();
