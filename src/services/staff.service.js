const StaffRepository = require("../repositories/staff.repository");
const { GenerateSalt, GeneratePassword } = require("../utils/auth.util");
const s3Service = require("./awsS3.service");

class StaffService {
  async getAllStaff() {
    const data = await StaffRepository.GetStaffs();
    return data;
  }

  async getStaffById(id) {
    return await StaffRepository.GetById(id);
  }

  async getStaffByRole(role) {
    return await StaffRepository.GetByRole(role);
  }

  async getStaffByEmail(email) {
    return await StaffRepository.GetByEmail(email);
  }

  async getStaffByPhone(phone) {
    return await StaffRepository.GetByPhone(phone);
  }

  async createStaff(req) {
    const staff = req.body;
    staff.isActivated = false;
    staff.start_date = new Date();
    const image = req.file;
    const result = await s3Service.uploadFile(image);
    staff.image = result;
    return await StaffRepository.CreateStaff(staff);
  }

  async updateStaff(id, req) {
    const staff = req.body;
    const image = req.file;

    if (staff?.password) {
      // create salt
      let salt = await GenerateSalt();
      // create password
      let hashPassword = await GeneratePassword(staff?.password, salt);
      staff.password = hashPassword;
    }
    if (image) {
      const result = await s3Service.uploadFile(image);
      staff.image = result;
    }

    return await StaffRepository.UpdateStaff(id, staff);
  }

  async getStaffByRole(role) {
    return await StaffRepository.GetByRole(role);
  }

  async getStaffByEmail(email) {
    return await StaffRepository.GetByEmail(email);
  }

  async getStaffByPhone(phone) {
    return await StaffRepository.GetByPhone(phone);
  }

  async createStaff(req) {
    const staff = req.body;
    staff.isActivated = false;
    staff.start_date = new Date();
    const image = req.file;
    if (image) {
      const result = await s3Service.uploadFile(image);
      staff.image = result;
    }
    return await StaffRepository.CreateStaff(staff);
  }

  async updateStaff(id, req) {
    const staff = req.body;
    const image = req.file;
    const oldStaff = await StaffRepository.GetById(id);
    if (staff?.password) {
      let salt = await GenerateSalt();
      // create password
      let hashPassword = await GeneratePassword(staff?.password, salt);
      staff.password = hashPassword;
    }
    if (staff?.phone && staff?.phone !== oldStaff.phone) {
      const isExist = await StaffRepository.GetByPhone(staff.phone);
      if (isExist) {
        throw new Error("Phone number already exists");
      }
    }
    if (staff?.email && staff?.email !== oldStaff.email) {
      const isExist = await StaffRepository.GetByEmail(staff.email);
      if (isExist) {
        throw new Error("Email already exists");
      }
    }
    if (image) {
      const result = await s3Service.uploadFile(image);
      staff.image = result;
    }

    return await StaffRepository.UpdateStaff(id, staff);
  }

  async deleteStaff(id) {
    return await StaffRepository.DeleteStaff(id);
  }

  async getByCinema(id) {
    return await StaffRepository.GetByCinema(id);
  }

  async getByCinema(id) {
    return await StaffRepository.GetByCinema(id);
  }
}

module.exports = new StaffService();
