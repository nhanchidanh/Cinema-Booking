import priceApi from "../api/priceApi";

export const getPrice = async () => {
  try {
    const response = await priceApi.getPriceProduct();
    return response;
  } catch (error) {
    throw error;
  }
};
