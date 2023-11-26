const Customer = require("../models/Customer");
const Rank = require("../models/Rank");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");



class CustomerRepository {
  async CreateCustomer(customer) {
    return await Customer.create(customer);
  }

  async GetByEmail(email) {
    return await Customer.findOne({
      where: {
        email: email,
      },
    });
  }

  async GetByPhone(phone) {
    return await Customer.findOne({
      where: {
        phone: {
           [Sequelize.Op.like]: `%${phone}%`,
        }
      },
    });
  }

  async GetById(id) {
    return await Customer.findOne({
      where: {
        id: id,
      },
    });
  }

  async UpdateCustomer(id, customer) {
    return await Customer.update(customer, {
      where: {
        id: id,
      },
    });
  }

  
  async UpdateCustomerByEmail(email, customer) {
    return await Customer.update(customer, {
      where: {
        email: email
      },
    });
  }

  async DeleteCustomer(id) {
    return await Customer.destroy({
      where: {
        id: id,
      },
    });
  }

  async GetAllCustomers({ keyword = '' }) {
    if (keyword) keyword = keyword?.trim(); 
    const where = {
      rank_id: {
        [Op.not]: 5
      },
      isActivated: true,
      [Op.or]: [
        {
          firstName: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          lastName: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },  
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    }
    return await Customer.findAll({
      where: where,
      include: [
        {
          model: Rank,
          attributes: ["id","nameRank"],
        }
      ],
      attributes: [
        "id","email","phone","firstName","lastName",
        "gender","dob","image","city_id","district_id",
        "ward_id","street","createdAt","updatedAt","address","isDeleted",
        "code"
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
  }

  async GetCustomerByPage(page, limit) {
    return await Customer.findAndCountAll({
      limit: limit,
      offset: page,
    });
  }
  
  async updateRank(id, rank_id) {
    return await Customer.update(
      {
        rank_id: rank_id,
      },
      {
        where: {
          id,
        },
      }
    );
  }

 


}

module.exports = new CustomerRepository();
