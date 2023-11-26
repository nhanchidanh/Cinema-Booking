const StatisticsRepository = require("../repositories/statistics.repository");
const moment = require("moment");

class StatisticsService {
  async getTop5Customers() {
    return await StatisticsRepository.GetTop5CustomersInMonth();
  }

  async getRevenueByStaff(query) {
    return await StatisticsRepository.GetRevenueByStaff(query);
  }

  async getRevenueByCustomer(query) {
    return await StatisticsRepository.GetRevenueByCustomer(query);
  }

  async getRevenueByMovie(query) {
    return await StatisticsRepository.GetRevenueByMovie(query);
  }

  async getRevenueByPromotionLine(query) {
    return await StatisticsRepository.GetRevenueByPromotionLine(query);
  }

  async getRefundOrder(query) {
    return await StatisticsRepository.GetRefundOrder(query);
  }

  async getTotalRevenue(query) {
    return await StatisticsRepository.GetTotalRevenue(query);
  }

  async getRevenueByShowtime(query) {
    return await StatisticsRepository.GetRevenueByShowtime(query);
  }

  async getRefundOrderDetail(query) {
    return await StatisticsRepository.GetRefundOrderDetail(query);
  }

  async getTop5Movies() {
    return await StatisticsRepository.GetTop5MoviesInMonth();
  }

  async getRatioDashboard() {
    return await StatisticsRepository.GetRatioDashboardInMonth();
  }

  async getRevenueInWeek() {
    const date_format = "YYYY-MM-DD";
    const week_length = 7;
    const date = moment().format(date_format);
    const start_date = moment(date).startOf("week").format(date_format);
    const end_date = moment(date).endOf("week").format(date_format);
    const dates = [];
    for (let i = 0; i < week_length; i++) {
      dates.push(moment(start_date).add(i, "days").format(date_format));
    }
    dates.sort((a, b) => {
      return moment(a).diff(moment(b));
    });
    let rs = [];
    await Promise.all(
      dates.map(async (date) => {
        const revenue = await StatisticsRepository.GetRevenueInWeek(date);
        rs.push({
          date: date,
          revenue: revenue[0].dataValues.total || 0,
        });
      })
    );
    rs.sort((a, b) => {
      return moment(a.date).diff(moment(b.date));
    });

    return rs;
  }

  async getTotalPercentCinema() {
    const data = await StatisticsRepository.GetTotalPercentUsersInMonth();
    return [
      {
        title: "Khách hàng Online",
        percent: data.percentUserOnline || 0,
      },
      {
        title: "Khách hàng Offline",
        percent: data.percentUserOf || 0,
      },
    ];
  }

  async getRevenueByCustomerInMonth(id) {
    return await StatisticsRepository.GetRevenueByCustomerInMonth(id);
  }
}

module.exports = new StatisticsService();
