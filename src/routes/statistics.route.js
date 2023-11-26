const StatisticsController = require("../controllers/statistics.controller");
const router = require("express").Router();

router.get("/top5customers", StatisticsController.getTop5Customers);
router.get("/top5movies", StatisticsController.getTop5Movies);
router.get("/revenuebystaff", StatisticsController.getRevenueByStaff);
router.get("/revenuebycustomer", StatisticsController.getRevenueByCustomer);
router.get("/revenuebymovie", StatisticsController.getRevenueByMovie);
router.get(
  "/revenuebypromotionline",
  StatisticsController.getRevenueByPromotionLine
);
router.get("/refundorder", StatisticsController.getRefundOrder);
router.get("/totalrevenue", StatisticsController.getTotalRevenue);
router.get("/revenuebyshowtime", StatisticsController.getRevenueByShowtime);
router.get("/refundorderdetail", StatisticsController.getRefundOrderDetail);
router.get("/ratioDashboard", StatisticsController.getRatioDashboard);
router.get("/revenueInWeek", StatisticsController.getRevenueInWeek);
router.get("/total-percent-users", StatisticsController.getTotalPercentCinema);

module.exports = router;
