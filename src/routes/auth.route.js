const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.SignUp);
// rm sms
// router.post("/verify-otp", authController.VerifyOTP);
router.post("/login", authController.Login);
router.post("/refresh-token", authController.RefreshToken);
router.get("/customer-info", authController.GetCustomerInfo);
router.get("/staff-info", authController.GetStaffInfo);
router.get("/verify", authController.VerifyUser);
router.post("/forgot-password", authController.sendEmailForgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/verify", authController.VerifyUser);
router.get("/verify-customer", authController.VerifyCustomer);
router.post("/update-password", authController.updatePassword);
module.exports = router;
