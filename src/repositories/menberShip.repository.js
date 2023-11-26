const MemberShip = require("../models/Membership");
const Customer = require("../models/Customer");
const Rank = require("../models/Rank");
class MemberShipRepository {
  async getAllMemberShip() {
    return await MemberShip.findAll();
  }

  async getMemberShipById(id) {
    return await MemberShip.findOne({
      where: {
        id: id,
      },
    });
  }

  async getMemberShipByCode(code) {
    return await MemberShip.findOne({
      where: {
        menberShipCode: code,
      },
    });
  }

  async getMemberShipByCustomerId(id) {
    return await MemberShip.findOne({
      where: {
        idCustomer: id,
      },
    });
  }

  async getMemberShipByRankId(id) {
    return await MemberShip.findAll({
      where: {
        idRank: id,
      },
    });
  }

  async createMemberShip(memberShip) {
    return await MemberShip.create(memberShip);
  }

  async updateMemberShip(id, memberShip) {
    return await MemberShip.update(memberShip, {
      where: {
        id: id,
      },
    });
  }

  async deleteMemberShip(id) {
    return await MemberShip.destroy({
      where: {
        id: id,
      },
    });
  }

  async GetInfoCustomer(id) {
    const data = await MemberShip.findOne({
      where: {
        idCustomer: id,
      },
      include: [
        {
          model: Customer,
          attributes: ["id", "email"],
        },
        {
          model: Rank,
          attributes: ["id", "nameRank"],
        },
      ],
      attributes: [
        "id",
        "menberShipCode",
        "currentPoint",
        "startDate",
      ],
    });
    return data;
  }

  async GetCustomers() {
    const data = await MemberShip.findAll({
      include: [
        {
          model: Customer,
        },
        {
          model: Rank,
        },
      ],
    });
    return data;
  }

  async updatePoint(id, point) {
    return await MemberShip.update( 
      {
        currentPoint: point,
      },
      {
        where: {
          idCustomer: id,
        },
      }
    );
  }

  async updateRank(id, idRank) {
    return await MemberShip.update(
      {
        idRank: idRank,
      },
      {
        where: {
          idCustomer: id,
        },
      }
    );
  }
}

module.exports = new MemberShipRepository();
