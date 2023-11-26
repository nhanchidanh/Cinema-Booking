import reservationApi from "../api/reservationApi";
import userApi from "../api/userApi";

export const SignUpUser = async (data) => {
  try {
    const dataResult = await userApi.signup(data);
    return dataResult;
  } catch (error) {
    console.log("fetch failed!!", error);
    throw error;
  }
};


export const getMemberShipById = async (id) => {
  try {
    const data = await userApi.getMemberShip(id)
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateInfoCustomer = async (id, dataPayload) => {
  try {
    const data = await userApi.updateCustomer(id, dataPayload)
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateInfoCustomerById = async (id, dataPayload) => {
  try {
    const data = await userApi.updateCustomerById(id, dataPayload)
    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordCustomer = async (id, dataPayload) => {
  try {
    const data = await userApi.updatePassword(id, dataPayload)
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerById = async (id) => {
  try {
    const data = await userApi.getCustomer(id)
    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordHandler = async (dataa) => {
  try {
    const data = await userApi.forgotPassword(dataa)
    return data;
  } catch (error) {
    throw error;
  }
};