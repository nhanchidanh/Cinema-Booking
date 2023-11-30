const MemberShipRepository = require("../repositories/menberShip.repository");

class MemberShipService {
  async getMemberShipById(id) {
    return await MemberShipRepository.getMemberShipById(id);
  }

  async getMemberShipByCode(code) {
    return await MemberShipRepository.getMemberShipByCode(code);
  }

  async getMemberShipByCustomerId(id) {
    return await MemberShipRepository.getMemberShipByCustomerId(id);
  }

  async getMemberShipByRankId(id) {
    return await MemberShipRepository.getMemberShipByRankId(id);
  }

  async createMemberShip(memberShip) {
    memberShip.startDate = new Date();
    memberShip.menberShipCode = "MS" + Math.floor(Math.random() * 1000000);
    return await MemberShipRepository.createMemberShip(memberShip);
  }

  async updateMemberShip(id, memberShip) {
    return await MemberShipRepository.updateMemberShip(id, memberShip);
  }

  async deleteMemberShip(id) {
    return await MemberShipRepository.deleteMemberShip(id);
  }

  async getInfoCustomer(id) {
    const total_spent = await StatisticsService.getRevenueByCustomerInMonth(id);
    const data = await MemberShipRepository.GetInfoCustomer(id);
    data.dataValues.total_spent = total_spent;
    return data;
  }
}

module.exports = new MemberShipService();
