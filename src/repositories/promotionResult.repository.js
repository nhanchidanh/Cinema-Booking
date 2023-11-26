const PromotionResult = require("../models/PromotionResult");
const PromotionLine = require("../models/PromotionLine");
const { Op } = require("sequelize");

class PromotionResultRepository {
    create(promotionResult) {
        return PromotionResult.create(promotionResult);
    }

    async getByOrderId(id) {
        return await PromotionResult.findAll({
            where: {
                idOrder: id,
            },
            order: [["id", "DESC"]],
            include: [
                {
                    model: PromotionLine,
                    attributes: ["id", "promotionCode", "desc"],
                }
            ],
        });
    }

    async getByPromotionId(id) {
        return await PromotionResult.findAll({
            where: {
                idPromotionLine: id,
            },
            order: [["id", "DESC"]],
            include: [
                {
                    model: PromotionLine,
                }
            ],
        });
    }

    async qtyUsedPromotionByCustomerPerDay(idPromotion, idCustomer, date) {
        return await PromotionResult.count({
            where: {
                idPromotionLine: idPromotion,
                idCustomer: idCustomer,
                dateUsed: {
                    [Op.eq]: date,
                },
                status: {
                    [Op.ne]: 0,
                },
            },
        });
    }

    async totalMoneyUsedPromotion(idPromotion) {
        const total = await PromotionResult.sum("moneyDiscount", {
            where: {
                idPromotionLine: idPromotion,
                status: {
                    [Op.ne]: 0,
                },
            },
        });
        return total ? total : 0;
    }

    async bulkCreate(promotionResult) {
        return await PromotionResult.bulkCreate(promotionResult);
    }

    async updateStatusByOrderId(idOrder, status) {
        return await PromotionResult.update(
            {
                status: status,
            },
            {
                where: {
                    idOrder: idOrder,
                },
            }
        );
    }
}

module.exports = new PromotionResultRepository();