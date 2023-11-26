const Staff = require("../models/Staff");
const { Op } = require("sequelize");

class StaffRepository {
  async CreateStaff(staff) {
    return await Staff.create(staff);
  }

  async GetByEmail(email) {
    return await Staff.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateVerify(emailPayLoad) {
    return await Staff.update(
      {
        isVerify: new Date().toString(),
      },
      {
        where: {
          email: emailPayLoad,
        },
      }
    );
  }

  async updateCurrentPassword(emailPayLoad, newPassword) {
    return await Staff.update(
      {
        password: newPassword,
      },
      {
        where: {
          email: emailPayLoad,
        },
      }
    )
  }

  async GetByPhone(phone) {
    return await Staff.findOne({
      where: {
        phone: phone,
      },
    });
  }

  async GetById(id) {
    return await Staff.findOne({
      where: {
        id: id,
      },
    });
  }

  async UpdateStaff(id, staff) {
    return await Staff.update(staff, {
      where: {
        id: id,
      },
    });
  }

  async GetStaffs() {
    return await Staff.findAll({
      where: {
        is_super_user: {
          [Op.not]: true,
        },
      },
      include: [
        {
          model: Staff,
          as: "Staffs",
          attributes: ["id", "email", "phone", "firstName", "lastName"],
        },
      ],
      attributes: [
        "id",
        "email",
        "isActivated",
        "phone",
        "firstName",
        "lastName",
        "gender",
        "dob",
        "phone",
        "firstName",
        "lastName",
        "gender",
        "dob",
        "start_date",
        "status",
        "position",
        "manager_id",
        "city_id",
        "district_id",
        "ward_id",
        "street",
        "image",
        "code"
      ],
    });
  }

  async GetStaffsByRole(role) {
    return await Staff.findAll({
      where: {
        role: role,
      },
    });
  }

  async GetRoleByStaffId(id) {
    return await Staff.findOne({
      where: {
        id: id,
      },
    });
  }

  async DeleteStaff(id) {
    return await Staff.destroy({
      where: {
        id: id,
      },
    });
  }

  async GetByCinema(id) {
    return await Staff.findAll({
      where: {
        status: 1,
        cinema_id: id,
      },
    });
  }
}

module.exports = new StaffRepository();
