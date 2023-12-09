const Product = require("../models/Product");
const { Op } = require("sequelize");

class ProductRepository {
  async getAllProduct({ keyword = "" }) {
    if (keyword) keyword = keyword.trim();
    const where = {
      [Op.or]: [
        {
          productName: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          productCode: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ],
    };
    return await Product.findAll({
      where: where,
    });
  }

  async getProductById(id) {
    return await Product.findOne({
      where: {
        id: id,
      },
    });
  }

  async getProductByName(name) {
    return await Product.findOne({
      where: {
        productName: name,
      },
    });
  }

  async getProductByCode(code) {
    return await Product.findOne({
      where: {
        productCode: code,
      },
    });
  }

  async createProduct(product) {
    return await Product.create(product);
  }

  async updateProduct(id, product) {
    return await Product.update(product, {
      where: {
        id: id,
      },
    });
  }

  async deleteProduct(id) {
    return await Product.destroy({
      where: {
        id: id,
      },
    });
  }

  async getListProductByType(type) {
    return await Product.findAll({
      where: {
        type: type,
      },
    });
  }
}

module.exports = new ProductRepository();
