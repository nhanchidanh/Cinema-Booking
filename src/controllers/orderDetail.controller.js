const OrderDetailService = require("../services/orderDetail.service");

class OrderDetailController {
    async getAll(req, res) {
        try {
            const orderDetails = await OrderDetailService.getAll();
            res.json(orderDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req, res) {
        try {
            const orderDetail = await OrderDetailService.getById(req.params.id);
            res.json(orderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getByOrderId(req, res) {
        try {
            const orderDetails = await OrderDetailService.getByOrderId(req.params.id);
            res.json(orderDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async create(req, res) {
        try {
            const orderDetail = await OrderDetailService.create(req.body);
            res.json(orderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new OrderDetailController();