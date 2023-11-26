const ZaloPayService = require('../services/zaloPay.service');

class ZaloPayController {
    async payment(req, res) {
        try {
            const { amount } = req.params;
            const result = await ZaloPayService.payment({
                amount
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getRequsetPaymentStatus(req, res) {
        try {
            const { appTransId, appTime } = req.params;
            const result = await ZaloPayService.getRequsetPaymentStatus({
                appTransId,
                appTime
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = new ZaloPayController();