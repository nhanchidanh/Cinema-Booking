const PromotionDetailRepository = require("../repositories/promotionDetail.repository");
const PriceLineRepository = require("../repositories/priceLine.repository");

class PromotionDetailService {
  async getAllPromotionDetail() {
    return await PromotionDetailRepository.getAllPromotionDetail();
  }

  async getPromotionDetailById(id) {
    return await PromotionDetailRepository.getPromotionDetailById(id);
  }

  async getPromotionDetailByPromotionLineId(id) {
    return await PromotionDetailRepository.getPromotionDetailByPromotionLineId(
      id
    );
  }

  async createPromotionDetail(promotionDetail) {
    if(promotionDetail.IdProduct_receive){
      const { IdProduct_receive, qty_receive, qty_buy } = promotionDetail;
      const { price } = await PriceLineRepository.getPriceByProduct(IdProduct_receive);
      const total = price * qty_receive;
      promotionDetail.money_received = total;
      promotionDetail.qty_buy = Number(qty_receive) + Number(qty_buy)
    }
    return await PromotionDetailRepository.createPromotionDetail(
      promotionDetail
    );
  }

  async updatePromotionDetail(id, promotionDetail) {
    await PromotionDetailRepository.updatePromotionDetail(id, promotionDetail);
    return { message: "Update success" };
  }

  async updatePromotionDetailByPromotionLineId(idLine, promotionDetail) {
    await PromotionDetailRepository.updatePromotionDetailByPromotionLineId(
      idLine,
      promotionDetail
    );
    return { message: "Update success" };
  }

  async deletePromotionDetail(id) {
    await PromotionDetailRepository.deletePromotionDetail(id);
    return { message: "Delete success" };
  }
}

module.exports = new PromotionDetailService();
