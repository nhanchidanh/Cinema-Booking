const SmsController = require('../controllers/sms.comtroller');
const router = require('express').Router();

router.post('/', SmsController.sendSMS);

module.exports = router;