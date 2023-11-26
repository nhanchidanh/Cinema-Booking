const sms = require('../config/sms');

class SmsController {
    async sendSMS(req, res) {
        const { phone, content } = req.body;
        sms.sendSMS(phone,content, (result) => {
            return res.status(200).json({
                message: result
            })
        })
    }
}

module.exports = new SmsController();

