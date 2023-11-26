import orderApi from "../api/orderApi";

export const createOrderMethod = async (data) => {
  try {
    const response = await orderApi.createOrder(data)
    return response;
  } catch (error) {
    throw error;
  }
};

export const getOrderByIdCustomer = async (data) => {
  try {
    const response = await orderApi.getOrdersByIdCustomer(data)
    return response;
  } catch (error) {
    throw error;
  }
};