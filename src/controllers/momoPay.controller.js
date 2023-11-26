const MomoPayService = require("../services/momo.service");

class MomoPayController {
  async payment(req, res) {
    try {
      const { amount } = req.params;
      const result = await MomoPayService.payment({
        amount,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getRequsetPaymentStatus(req, res) {
    try {
      const { orderId, requestId } = req.query;
      const result = await MomoPayService.getRequsetPaymentStatus({
        orderId,
        requestId,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async refund(req, res) {
    try {
      const { amount, description, transId } = req.query;
      const result = await MomoPayService.refund({
        amount,
        description,
        transId,
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new MomoPayController();
