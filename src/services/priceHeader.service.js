const PriceLine = require("../models/PriceLine");
const PriceHeaderRepository = require("../repositories/priceHeader.repository");
const PriceLineRepository = require("../repositories/priceLine.repository");
const PriceLineService = require("../services/priceLine.service");
const moment = require("moment");

class PriceHeaderService {
  async getAllPriceHeader(query) {
    return await PriceHeaderRepository.getAllPriceHeader(query);
  }

  async getPriceHeaderById(id) {
    return await PriceHeaderRepository.getPriceHeaderById(id);
  }

  async getPriceHeaderByProduct(idProduct) {
    return await PriceHeaderRepository.getPriceHeaderByProduct(idProduct);
  }

  async createPriceHeader(priceHeader) {
    priceHeader.priceCode = `PRI${priceHeader.priceCode}`
    const priceCodeIsExist = await PriceHeaderRepository.getPriceHeaderByCode(priceHeader.priceCode);
    if(priceCodeIsExist){
      throw new Error('Price code is exist');
    }
    return await PriceHeaderRepository.createPriceHeader(priceHeader);
  }

  async checkPriceHeader(id) {
    const { startDate, endDate } = await this.getPriceHeaderById(id);
    const products = await PriceLineRepository.getPriceLineByPriceHeaderId(id);
    const listIdProduct = products.map((item) => {
      return item.Product.id;
    });
    for (let i = 0; i < listIdProduct.length; i++) {
      console.log("id", listIdProduct[i]);
      const check = await PriceLineRepository.checkPriceLine({
        idProduct: listIdProduct[i],
        startDate: startDate,
        endDate: endDate,
      });
      if (check.length > 0) {
        return check;
      } else if (i === listIdProduct.length - 1) {
        return [];
      }
    }
  }

  async updatePriceHeader(id, priceHeader) {
    const { status } = priceHeader;
    if (status === 0) {
      return await PriceHeaderRepository.updatePriceHeader(id, priceHeader);
    } else {
      const check = await this.checkPriceHeader(id);
      console.log("check", check);
      if ( check && check.length > 0) {
        return {
          message: "Price line is exist",
          data: check,
          status: 409,
        };
      } else {
        return await PriceHeaderRepository.updatePriceHeader(id, priceHeader);
      }
    }

    // if(check.length > 0){
    //   return check;
    // }else{
    //   return await PriceHeaderRepository.updatePriceHeader(id, priceHeader);
    // }
  }

  async deletePriceHeader(id) {
    return await PriceHeaderRepository.updatePriceHeader(id, {
      status: 3,
    });
  }

  async getProductByPriceHeader(id) {
    return await PriceHeaderRepository.getProductByPriceHeader(id);
  }
}

module.exports = new PriceHeaderService();
