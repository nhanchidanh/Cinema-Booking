const OrderService = require('../services/order.service');
const ReservationService = require('../services/reservation.service');

class OrderController {
    async getAll(req, res) {
        try {
            const orders = await OrderService.getAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req, res) {
        try {
            const order = await OrderService.getById(req.params.id);
            res.json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getByCustomerId(req, res) {
        try {
            const orders = await OrderService.getByCustomerId(req.params.id);
            res.json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getByType(req, res) {
        try {
            const orders = await OrderService.getByType(req.params.type, req.query);
            res.json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getByStaffId(req, res) {
        try {
            const orders = await OrderService.getByStaffId(req.params.id);
            res.json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async create(req, res) {
        try {
            if (req.body.idStaff) {
                req.body.paymentMethod = 0;
                console.log('Desktop');
            } else {
                req.body.paymentMethod = 1;
                console.log('Mobile');
            }
            const order = await OrderService.create(req.body);
            const seats = req.body.seats.map(seat => {
                return seat.idSeat;
            })
            await ReservationService.create({
                showTime_id: req.body.idShowMovie,
                seats,
                staff_id: req.body?.idStaff
            })
            res.json(order);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async updateStatus(req, res) {
        try {
            const order = await OrderService.updateStatus(req.params.id, req.body.status);
            res.json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async refund(req, res) {
        try {
            const order = await OrderService.refund(req.params.id,req.body);
            res.json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

module.exports = new OrderController();