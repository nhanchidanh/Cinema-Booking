const PromotionLineRepository = require("../repositories/promotionLine.repository");
const s3Service = require("./awsS3.service");
const PromotionDetailService = require("./promotionDetail.service");

class PromotionLineService {
  async getAllPromotionLine() {
    return await PromotionLineRepository.getAllPromotionLine();
  }

  async getPromotionLineById(id) {
    return await PromotionLineRepository.getPromotionLineById(id);
  }

  async getPromotionLineByCode(code) {
    return await PromotionLineRepository.getPromotionLineByCode(code);
  }

  async getPromotionLineByPromotionHeaderId(id) {
    return await PromotionLineRepository.getPromotionLineByPromotionHeaderId(
      id
    );
  }

  async createPromotionLine(req) {
    console.log(req.body);
    const promotionLine = req.body;
    const newPromotionLine = await PromotionLineRepository.createPromotionLine(
      promotionLine
    );
    return newPromotionLine;
  }

  async updatePromotionLine(id,payloadLine, payloadDetail) {
    await PromotionLineRepository.updatePromotionLine(id, payloadLine);
    if (payloadDetail) {
      await PromotionDetailService.updatePromotionDetailByPromotionLineId(
        id,
        payloadDetail
      );
    }
    return { message: "Update success" };
  }

  async deletePromotionLine(id) {
    await PromotionLineRepository.updatePromotionLine(id, { status: 3 });
    return { message: "Delete success" };
  }

  async getPromotionLineActive() {
    return await PromotionLineRepository.getPromotionLineActive();
  }
}

module.exports = new PromotionLineService();
