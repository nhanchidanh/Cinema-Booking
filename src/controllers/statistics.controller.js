const StatisticsService = require('../services/statistics.service');

class StatisticsController {
    // [GET] /statistics/top5customers
    async getTop5Customers(req, res) {
        try {
            const top5Customers = await StatisticsService.getTop5Customers();
            res.status(200).json(top5Customers);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/revenuebystaff
    async getRevenueByStaff(req, res) {
        try {
            const query = req.query;
            const revenueByStaff = await StatisticsService.getRevenueByStaff(query);
            res.status(200).json(revenueByStaff);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/revenuebycustomer
    async getRevenueByCustomer(req, res) {
        try {
            const query = req.query;
            const revenueByCustomer = await StatisticsService.getRevenueByCustomer(query);
            res.status(200).json(revenueByCustomer);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/revenuebymovie
    async getRevenueByMovie(req, res) {
        try {
            const query = req.query;
            const revenueByMovie = await StatisticsService.getRevenueByMovie(query);
            res.status(200).json(revenueByMovie);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/revenuebypromotionline
    async getRevenueByPromotionLine(req, res) {
        try {
            const query = req.query;
            const revenueByPromotionLine = await StatisticsService.getRevenueByPromotionLine(query);
            res.status(200).json(revenueByPromotionLine);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/refundorder
    async getRefundOrder(req, res) {
        try {
            const refundOrder = await StatisticsService.getRefundOrder(req.query);
            res.status(200).json(refundOrder);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/totalrevenue
    async getTotalRevenue(req, res) {
        try {
            const totalRevenue = await StatisticsService.getTotalRevenue(req.query);
            res.status(200).json(totalRevenue);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/revenuebyshowtime
    async getRevenueByShowtime(req, res) {
        try {
            const revenueByShowtime = await StatisticsService.getRevenueByShowtime(req.query);
            res.status(200).json(revenueByShowtime);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    // [GET] /statistics/refundorderdetail
    async getRefundOrderDetail(req, res) {
        try {
            const refundOrderDetail = await StatisticsService.getRefundOrderDetail(req.query);
            res.status(200).json(refundOrderDetail);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    async getTop5Movies(req, res) {
        try {
            const top5Movies = await StatisticsService.getTop5Movies();
            res.status(200).json(top5Movies);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }

    }

    async getRatioDashboard(req, res) {
        try {
            const ratioDashboard = await StatisticsService.getRatioDashboard();
            res.status(200).json(ratioDashboard);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }

    }

    async getRevenueInWeek(req, res) {
        try {
            const revenueInWeek = await StatisticsService.getRevenueInWeek();
            res.status(200).json(revenueInWeek);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }

    }

    async getTotalPercentCinema(req, res) {
        try {
            const totalPercentCinema = await StatisticsService.getTotalPercentCinema();
            res.status(200).json(totalPercentCinema);
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }

    }

    
}

module.exports = new StatisticsController();