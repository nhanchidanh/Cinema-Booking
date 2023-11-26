const PromotionResultRepository = require("../repositories/promotionResult.repository");

class PromotionResultService {

    async getAll() {
        const qtyUsedPromotion = await PromotionResultRepository.qtyUsedPromotion(14);
        const qtyUsedPromotionByCustomerPerDay = await PromotionResultRepository.qtyUsedPromotionByCustomerPerDay(14, 9, "2023-03-30");
        const totalMoneyUsedPromotion = await PromotionResultRepository.totalMoneyUsedPromotion(14);
        return {
            qtyUsedPromotion,
            qtyUsedPromotionByCustomerPerDay,
            totalMoneyUsedPromotion,
        };
    }

    async create(promotionResult) {
        return await PromotionResultRepository.create(promotionResult);
    }

    async getByOrderId(id) {
        return await PromotionResultRepository.getByOrderId(id);
    }

    async getByPromotionId(id) {
        return await PromotionResultRepository.getByPromotionId(id);
    }

    async qtyUsedPromotion(idPromotion) {
        return await PromotionResultRepository.qtyUsedPromotion(idPromotion);
    }

    async qtyUsedPromotionByCustomerPerDay(idPromotion, idCustomer, date) {
        return await PromotionResultRepository.qtyUsedPromotionByCustomerPerDay(
            idPromotion,
            idCustomer,
            date
        );
    }

    async totalMoneyUsedPromotion(idPromotion) {
        return await PromotionResultRepository.totalMoneyUsedPromotion(
            idPromotion
        );
    }
}

module.exports = new PromotionResultService();