const CustomerController = require('../controllers/customer.controller');
const router = require('express').Router();
const uploadFile = require('../middleware/uploadFile.middleware');

router.get('/', CustomerController.getAllCustomer);
router.get('/:id', CustomerController.getCustomerById);
router.get('/code/:code', CustomerController.getCustomerByCode);
router.get('/phone/:phone', CustomerController.getCustomerByPhone);
router.get('/email/:email', CustomerController.getCustomerByEmail);
router.get('/membership/:id', CustomerController.getInfoMemberShip);
router.post('/',uploadFile.uploadFileMiddleware, CustomerController.createCustomer);
router.put('/:id',uploadFile.uploadFileMiddleware, CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);
router.get('/all', CustomerController.getCustomers);
router.post('/cinema', CustomerController.createCustomerInCinema);
router.put('/update-password/:id',CustomerController.updatePasswordCustomer);
router.put('/update-customer/:id',CustomerController.updateCustomerById);
router.post('/forgot-password',CustomerController.forgotPassword);

module.exports = router;
