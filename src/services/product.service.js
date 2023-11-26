const ProductRepository = require("../repositories/product.repository");
const s3Service = require("./awsS3.service");

class ProductService {
  async getAllProduct(query) {
    return await ProductRepository.getAllProduct(query);
  }

  async getProductById(id) {
    return await ProductRepository.getProductById(id);
  }

  async getProductByName(name) {
    return await ProductRepository.getProductByName(name);
  }

  async getProductByCode(code) {
    return await ProductRepository.getProductByCode(code);
  }

  async getListProductByType(type) {
    return await ProductRepository.getListProductByType(type);
  }

  async createProduct(req) {
    const product = req.body;
    const image = req.file;
    console.log(image);
    if (image) {
      const result = await s3Service.uploadFile(image);
      console.log(result);
      product.image = result;
    }
    product.productCode = `PRD${product.productCode}`;
    const productCodeIsExist = await this.getProductByCode(product.productCode);
    if (productCodeIsExist) {
      throw new Error("Mã sản phẩm đã tồn tại");
    }
    return await ProductRepository.createProduct(product);
  }

  async updateProduct(id, req) {
    const product = req.body;
    const image = req.file;
    if (image) {
      const result = await s3Service.uploadFile(image);
      console.log(result);
      product.image = result;
    }
    await ProductRepository.updateProduct(id, product);

    return await this.getProductById(id);
  }

  async deleteProduct(id) {
    return await ProductRepository.deleteProduct(id);
  }
}

module.exports = new ProductService();
