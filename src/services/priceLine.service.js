const PriceLineRepository = require('../repositories/priceLine.repository');
const ProductServices = require('../services/product.service');
const PriceHeaderServices = require('../services/priceHeader.service');

class PriceLineService {
  async getAllPriceLine() {
    return await PriceLineRepository.getAllPriceLine();
  }

  async getPriceLineById(id) {
    return await PriceLineRepository.getPriceLineById(id);
  }

  async getPriceLineByPriceHeaderId(id) {
    const data = await PriceLineRepository.getPriceLineByPriceHeaderId(id);
    const priceHeader = await PriceHeaderServices.getPriceHeaderById(id);
    return{
      priceHeader,
      lines:[...data]
    }
  }

  async getPriceAllProduct() {
    let listPrice = [];
    try {
      const listProduct = await ProductServices.getAllProduct("");
    
      for (let i = 0; i < listProduct.length; i++) {
        const price = await PriceLineRepository.getPriceByProduct(listProduct[i].id);
        listPrice.push({
          id: listProduct[i].id,
          productCode: listProduct[i].productCode,
          productName: listProduct[i].productName,
          price:price?.price || null,
        });
      }
    } catch (error) {
      console.log(error);
    }

    return listPrice;
  }

  async checkPriceLine(body) {
    return await PriceLineRepository.checkPriceLine(body);
  }

  async checkLineIsExist(idPriceHeader, idProduct) {
    return await PriceLineRepository.lineIsExist(idProduct,idPriceHeader);
  }

  async createPriceLine(priceLine) {
    const {idPriceHeader} = priceLine;
    const {startDate, endDate} = await PriceHeaderServices.getPriceHeaderById(idPriceHeader);
    // const check = await this.checkPriceLine({
    //   idProduct: priceLine.idProduct,
    //   startDate,
    //   endDate,
    // });

    // const checkLine = await this.checkLineIsExist(idPriceHeader, priceLine.idProduct);
    // if (checkLine) {
    //   return {
    //     message: 'Price line is exist',
    //     data: checkLine,
    //     status: 400,
    //   }
    // }

    // if (check.length > 0) {
    //   return {
    //     message: 'Price line is exist',
    //     data: check,
    //     status: 409,
    //   }
    // }else{
      const data = await PriceLineRepository.createPriceLine(priceLine);
      return {
        message: 'Create price line success',
        data,
        status: 200,
      }
    // }
  }

  async updatePriceLine(id, priceLine) {
    return await PriceLineRepository.updatePriceLine(id, priceLine);
  }

  async deletePriceLine(id) {
    return await PriceLineRepository.deletePriceLine(id);
  }

  async getPriceByProduct(idProduct){
    return await PriceLineRepository.getPriceByProduct(idProduct);
  }
}

module.exports = new PriceLineService();