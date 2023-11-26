const OrderDetailRepository = require("../repositories/orderDetail.repository");

class OrderDetailService {

    async getAll() {
        return await OrderDetailRepository.getAll();
    }

    async getById(id) {
        return await OrderDetailRepository.getById(id);
    }

    async getByOrderId(id) {
        return await OrderDetailRepository.getByOrderId(id);
    }

    async create(orderDetail) {
        return await OrderDetailRepository.create(orderDetail);
    }
};

module.exports = new OrderDetailService();