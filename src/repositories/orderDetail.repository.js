const OrderDetail = require("../models/OrderDetail");
const CinemaHallSeat = require("../models/CinemaHallSeat");
const Product = require("../models/Product");

class OrderDetailRepository {
    async getAll() {
        return await OrderDetail.findAll(
            {
                order: [["id", "DESC"]],
            }
        );
    }

    async getById(id) {
        return await OrderDetail.findOne({
            where: {
                id: id,
            },
        });
    }

    async getByOrderId(id) {
        return await OrderDetail.findAll({
            where: {
                idOrder: id,
            },
            order: [["id", "DESC"]],
            include: [
                {
                    model: CinemaHallSeat,
                    attributes: ['id', 'seatColumn', 'seatRow'],
                },
                {
                    model: Product,
                    attributes: ['id', 'productCode', 'productName'],
                }
            ],
            attributes: ['id', 'price', 'qty', 'qtyProduct', 'priceProduct', 'type'],
        });
    }

    async create(orderDetail) {
        return await OrderDetail.create(orderDetail);
    }

    async bulkCreate(orderDetail) {
        return await OrderDetail.bulkCreate(orderDetail);
    }

    async getByType(idOrder, type) {
        return await OrderDetail.findAll({
            where: {
                idOrder: idOrder,
                type: type,
            },
            order: [["id", "DESC"]],
        });
    }

    async countSeat(idOrder) {
        return await OrderDetail.count({
            where: {
                idOrder: idOrder,
                type: 1,
            },
        });
    }
};

module.exports = new OrderDetailRepository();