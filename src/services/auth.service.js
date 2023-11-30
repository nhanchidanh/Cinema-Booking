const bcrypt = require("bcrypt");
const CustomerRepository = require("../repositories/customer.repository");
const StaffRepository = require("../repositories/staff.repository");
const RoleRepository = require("../repositories/role.repository");
const mailer = require("../utils/mailer");
const MemberShipService = require("../services/menberShip.service");
const {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  GenerateOTP,
  ValidateSignatureRefresh,
  ValidateSignatureWithAccess,
} = require("../utils/auth.util");
const axios = require("axios");
require("dotenv").config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const Redis = require("../config/redis");
const ejs = require("ejs");
const customerRepository = require("../repositories/customer.repository");

const renderEjs = async (filename, data, options) => {
  const ejsString = await new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, options, function (err, str) {
      return err ? reject(err) : resolve(str);
    });
  });
  return ejsString;
};
class CustomerService {
  async SignUp(userInputs) {
    const {
      email,
      password,
      phone,
      firstName,
      lastName,
      gender,
      dob,
      city_id,
      district_id,
      ward_id,
      street,
      brithday,
      position,
      start_date,
      status,
      manager_id,
      cinema_id,
    } = userInputs;

    // create salt
    let salt = await GenerateSalt();
    // create password
    let hashPassword = await GeneratePassword(password, salt);

    let messages;

    let isActivateds;

    let _id;

    // Sign up staff
    if (position) {
      // Check email is exist
      const isExist = await StaffRepository.GetByEmail(email);
      const isPhoneExist = await StaffRepository.GetByPhone(phone);
      if (isExist || isPhoneExist) {
        return {
          status: 400,
          message: "Email or Phone is exist",
        };
      }

      // create staff
      const newStaff = {
        email,
        password: hashPassword,
        isActivated: true,
        phone,
        firstName,
        lastName,
        gender,
        dob,
        start_date,
        status,
        position,
        manager_id,
        cinema_id,
        salt,
        city_id,
        district_id,
        ward_id,
        street,
        isVerify: "",
      };

      const existingStaff = await StaffRepository.CreateStaff(newStaff);
      if (existingStaff?.email) {
        bcrypt.hash(newStaff.email, parseInt(10)).then(async (hashedEmail) => {
          const mailTemplate = await renderEjs(
            `${process.cwd()}/src/resources/views/invite-non-user.ejs`,
            {
              fromOrgName: "Galaxy Cinema",
              linkInvite: `${process.env.APP_URL}/auth/verify?email=${existingStaff.email}&token=${hashedEmail}`,
              fromEmail: "admin@admin.com",
              fromName: "Admin",
              userName: `${existingStaff.firstName} ${existingStaff.lastName}`,
            }
          );
          mailer.sendMail(
            existingStaff.email,
            "Galaxy Cinema Notification: Create Account Successfully",
            mailTemplate
          );
        });
      }
      messages = "Sign up success";
      isActivateds = existingStaff.isActivated;
      _id = existingStaff.id;
    }
    // Sign up customer
    else {
      // Check email is exist
      const isExist = await CustomerRepository.GetByEmail(email);
      const isPhoneExist = await CustomerRepository.GetByPhone(phone);
      if (isExist || isPhoneExist) {
        return {
          status: 400,
          message: "Email or Phone is exist",
        };
      }

      // create customer
      const newCustomer = {
        email,
        password: hashPassword,
        isActivated: false,
        phone,
        firstName,
        lastName,
        gender,
        city_id,
        district_id,
        ward_id,
        street,
        salt,
        dob,
        rank_id: 2,
      };

      const existingCustomer = await CustomerRepository.CreateCustomer(
        newCustomer
      );

      if (existingCustomer?.email) {
        bcrypt
          .hash(newCustomer.email, parseInt(10))
          .then(async (hashedEmail) => {
            const mailTemplate = await renderEjs(
              `${process.cwd()}/src/resources/views/invite-non-user.ejs`,
              {
                fromOrgName: "Galaxy Cinema",
                linkInvite: `${process.env.APP_URL}/auth/verify-customer?email=${existingCustomer.email}&token=${hashedEmail}`,
                fromEmail: "admin@admin.com",
                fromName: "Admin",
                userName: `${existingCustomer.firstName} ${existingCustomer.lastName}`,
              }
            );
            mailer.sendMail(
              existingCustomer.email,
              "Galaxy Cinema Notification: Create Galaxy Cinema Account Successfully",
              mailTemplate
            );
          });
      }

      const { id } = existingCustomer;
      const myPhone = existingCustomer.phone;
      messages = "Please check your phone to verify your account";
      isActivateds = existingCustomer.isActivated;
      _id = existingCustomer.id;
      try {
        // rm sms
        // await this.sendOTP(id, myPhone);

        const createMemberShip = {
          idCustomer: id,
          idRank: 2,
        };
        const mb = await MemberShipService.createMemberShip(createMemberShip);
      } catch (err) {
        return {
          status: 400,
          message: "Send OTP failed",
          error: err.message,
        };
      }
    }

    return {
      status: 200,
      messages,
      data: {
        _id,
        email,
        phone,
        isActivateds,
        hashPassword,
      },
    };
  }

  async Login(userInputs) {
    const { phone, password, staff, email } = userInputs;
    if (staff) {
      let existingStaff = null;
      if (phone) {
        existingStaff = await StaffRepository.GetByPhone(phone);
      } else if (email) {
        existingStaff = await StaffRepository.GetByEmail(email);
      }
      if (!existingStaff) {
        return {
          status: 400,
          code: 1,
          message: "Tài khoản hoặc mật khẩu sai.",
        };
      }
      if (!existingStaff.isVerify) {
        return {
          status: 403,
          code: 2,
          message: "Tài khoản chưa được xác minh.",
        };
      }
      if (existingStaff == null) {
        return {
          status: 400,
          message: "Phone is not exist",
        };
      }
      // let { nameRole } = await RoleRepository.GetNameRoleByStaffId(
      //   existingStaff.id
      // );

      // existingStaff.dataValues["nameRole"] = nameRole;
      if (!existingStaff) {
        return {
          status: 400,
          message: "Email is not exist",
        };
      }

      const validatePassword = await ValidatePassword(
        password,
        existingStaff.password
      );

      const playload = {
        email: existingStaff.email,
        id: existingStaff.id,
      };

      if (validatePassword) {
        const accessToken = await GenerateSignature(
          playload,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await GenerateSignature(
          playload,
          refreshTokenSecret,
          refreshTokenLife
        );

        Redis.set(existingStaff.id, refreshToken, 365 * 24 * 60 * 60);
        return {
          status: 200,
          message: "Login success",
          data: {
            staff: existingStaff,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        };
      } else {
        return {
          status: 400,
          message: "Password is not valid",
        };
      }
    } else {
      let existingCustomer = null;
      if (phone) {
        existingCustomer = await CustomerRepository.GetByPhone(phone);
      } else if (email) {
        existingCustomer = await CustomerRepository.GetByEmail(email);
      }

      // const existingCustomer = await CustomerRepository.GetByPhone(phone);
      if (existingCustomer && existingCustomer.isActivated == false) {
        return {
          status: 400,
          code: 1,
          message: "Account is not activated",
        };
      }

      if (!existingCustomer) {
        return {
          status: 400,
          code: 2,
          message: "Email is not exist",
        };
      }

      if (existingCustomer?.isDeleted) {
        return {
          status: 403,
          code: 3,
          message: "Tài khoản đã bị ngưng hoạt động",
        };
      }

      const validatePassword = await ValidatePassword(
        password,
        existingCustomer.password
      );
      const playload = {
        email: existingCustomer.email,
        id: existingCustomer.id,
      };

      if (validatePassword) {
        const accessToken = await GenerateSignature(
          playload,
          accessTokenSecret,
          accessTokenLife
        );
        const refreshToken = await GenerateSignature(
          playload,
          refreshTokenSecret,
          refreshTokenLife
        );
        await Redis.set(existingCustomer.id, refreshToken, 365 * 24 * 60 * 60);

        return {
          status: 200,
          message: "Login success",
          data: {
            customer: existingCustomer,
            accessToken,
            refreshToken,
          },
        };
      } else {
        return {
          status: 400,
          message: "Password is not correct",
        };
      }
    }
  }

  async RefreshToken(body) {
    const { refreshToken } = body;
    const { email, id } = await ValidateSignatureRefresh(
      refreshToken,
      refreshTokenSecret
    );
    const checkRefreshToken = await Redis.get(id);
    if (!checkRefreshToken) {
      return {
        status: 400,
        message: "Refresh token is not exist",
      };
    }
    if (checkRefreshToken !== refreshToken) {
      return {
        status: 400,
        message: "Refresh token is not valid",
      };
    }

    const playload = {
      email,
      id,
    };

    const newAccessToken = await GenerateSignature(
      playload,
      accessTokenSecret,
      accessTokenLife
    );
    const newRefreshToken = await GenerateSignature(
      playload,
      refreshTokenSecret,
      refreshTokenLife
    );
    Redis.set(id, newRefreshToken, "EX", 365 * 24 * 60 * 60);
    return {
      status: 200,
      message: "Refresh token success",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }

  async GetCustomerByAccessToken(req) {
    const { email, id } = await ValidateSignatureWithAccess(req);
    const existingCustomer = await CustomerRepository.GetById(id);
    delete existingCustomer.dataValues.password;

    if (!existingCustomer) {
      return {
        status: 400,
        message: "User is not exist",
      };
    }
    return {
      status: 200,
      message: "Get user info success",
      data: {
        customer: existingCustomer,
      },
    };
  }

  async GetStaffByAccessToken(req) {
    const { email, id } = await ValidateSignatureWithAccess(req);
    const existingStaff = await StaffRepository.GetById(id);
    let { nameRole } = await RoleRepository.GetNameRoleByStaffId(
      existingStaff.id
    );
    delete existingStaff.dataValues.password;
    existingStaff.dataValues["nameRole"] = nameRole;
    if (!existingStaff) {
      return {
        status: 400,
        message: "User is not exist",
      };
    }
    return {
      status: 200,
      message: "Get user info success",
      data: {
        staff: existingStaff,
      },
    };
  }

  async handleVerifyUser(req, res) {
    bcrypt.compare(
      req.query.email,
      req.query.token,
      async function (err, result) {
        if (result) {
          try {
            const existingStaff = await StaffRepository.GetByEmail(
              req.query.email
            );
            if (existingStaff?.isVerify) {
              res.render("Verify", {
                name: existingStaff?.firstName + " " + existingStaff?.lastName,
                password: "123456789",
                text: "Tài khoản đã được xác minh.",
              });
            } else {
              await StaffRepository.updateVerify(req.query.email);
              res.render("Verify", {
                name: existingStaff?.firstName + " " + existingStaff?.lastName,
                password: "123456789",
                text: "Xác minh thành công!",
              });
            }
          } catch (error) {
            res.render("VerifyError");
          }
        } else {
          res.render("VerifyError");
        }
      }
    );
  }
  async handleVerifyCustomer(req, res) {
    bcrypt.compare(
      req.query.email,
      req.query.token,
      async function (err, result) {
        if (result) {
          try {
            const existingStaff = await customerRepository.GetByEmail(
              req.query.email
            );
            if (existingStaff?.isActivated) {
              res.render("verify-customer", {
                name: existingStaff?.firstName + " " + existingStaff?.lastName,
                text: "Tài khoản đã được xác minh.",
              });
            } else {
              await CustomerRepository.UpdateCustomerByEmail(req.query.email, {
                isActivated: true,
              });
              res.render("verify-customer", {
                name: existingStaff?.firstName + " " + existingStaff?.lastName,
                text: "Xác minh thành công!",
              });
            }
          } catch (error) {
            res.render("VerifyError");
          }
        } else {
          res.render("VerifyError");
        }
      }
    );
  }

  async handleSendEmailGetPassword(req, res) {
    const user = await StaffRepository.GetByEmail(req.body.email);
    if (!user) {
      return {
        status: 404,
        code: 0,
        message: "Email không tồn tại trong hệ thống.",
      };
    } else {
      bcrypt.hash(user.email, parseInt(10)).then(async (hashedEmail) => {
        // mailer.sendMail(
        //   user.email,
        //   "Reset Password",
        //   `<a href=${process.env.URL_FE}/auth/reset-password?email=${user.email}&token=${hashedEmail}> Reset Password </a>`
        // );

        const mailTemplate = await renderEjs(
          `${process.cwd()}/src/resources/views/reset-password.ejs`,
          {
            fromOrgName: "Galaxy Cinema",
            linkInvite: `${process.env.URL_FE}/auth/reset-password?email=${user.email}&token=${hashedEmail}`,
            fromEmail: "admin@admin.com",
            fromName: "Admin",
            userName: `${user.firstName} ${user.lastName}`,
          }
        );
        mailer.sendMail(
          user.email,
          "Galaxy Cinema Notification: Setup Galaxy Cinema Password",
          mailTemplate
        );
        res.json({
          status: 200,
          code: 1,
          message: "Link lấy lại Mật Khẩu đã được gửi về email.",
        });
      });
    }
  }

  async handleResetPassword(req, res) {
    const { email, token, password } = req.body;
    bcrypt.compare(email, token, async function (err, result) {
      if (result) {
        let salt = await GenerateSalt();
        let hashPassword = await GeneratePassword(password, salt);

        const status = await StaffRepository.updateCurrentPassword(
          email,
          hashPassword
        );
        mailer.sendMail(
          email,
          "Thông báo đổi mật khẩu thành công.",
          `Mật khẩu đã được thay đổi, mật khẩu hiện tại: ${password}`
        );
        res.json({
          status: 200,
          code: 1,
          message: "Cập nhật mật khẩu thành công.",
        });
      } else {
        res.json({
          status: 403,
          code: 2,
          message: "Email hoặc Token không chính xác.",
        });
      }
    });
  }

  async handleUpdatePassword(req, res) {
    const { email, password } = req.body;
    let salt = await GenerateSalt();
    let hashPassword = await GeneratePassword(password, salt);

    try {
      const status = await StaffRepository.updateCurrentPassword(
        email,
        hashPassword
      );

      res.json({
        status: 200,
        code: 1,
        message: "Cập nhật mật khẩu thành công.",
      });
    } catch (error) {
      res.json({
        status: 403,
        code: 2,
        message: "Email hoặc Token không chính xác.",
      });
    }
  }
}

module.exports = new CustomerService();
