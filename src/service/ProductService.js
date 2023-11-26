import productApi from "../api/productApi";

export const getProductAndPrice = async () => {
  try {
    const data = await productApi.getAllPriceProduct();
    return data;
  } catch (error) {
    throw error;
  }
};
