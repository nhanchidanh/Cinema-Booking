const authServices = require("../services/auth.service");

class AuthController {
  //[POST] /signup
  async SignUp(req, res) {
    try {
      const rs = await authServices.SignUp(req.body);
      res.status(rs.status).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
  // rm sms
  //[POST] /verify-otp
  // async VerifyOTP(req, res) {
  //     try{
  //         // id, otp
  //         const rs = await authServices.VerifyOTP(req.body);
  //         res.status(rs.status).json(rs);
  //     }catch(err){
  //         res.status(500).json({
  //             status: 500,
  //             message: err.message
  //         })
  //     }
  // }

  //[POST] /login
  async Login(req, res) {
    try {
      // email, password
      const rs = await authServices.Login(req.body);
      res.status(rs.status).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[POST] /refresh-token
  async RefreshToken(req, res) {
    try {
      const rs = await authServices.RefreshToken(req.body);
      res.status(rs.status).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async GetCustomerInfo(req, res) {
    try {
      const rs = await authServices.GetCustomerByAccessToken(req);
      res.status(rs.status).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async GetStaffInfo(req, res) {
    try {
      const rs = await authServices.GetStaffByAccessToken(req);
      res.status(rs.status).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async VerifyUser(req, res) {
    try {
      const rs = await authServices.handleVerifyUser(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async VerifyCustomer(req, res) {
    try {
      const rs = await authServices.handleVerifyCustomer(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async sendEmailForgotPassword(req, res) {
    try {
      const rs = await authServices.handleSendEmailGetPassword(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const rs = await authServices.handleResetPassword(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async resetPasswordCustomer(req, res) {
    try {
      const rs = await authServices.handleResetPasswordCustomer(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const rs = await authServices.handleUpdatePassword(req, res);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new AuthController();
