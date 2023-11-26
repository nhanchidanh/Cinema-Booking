import axiosApi from "./axisosApi";

const zaloApi = {
  create: (money) => {
    return axiosApi.post(`/zaloPay/payment/${money}`);
  },

  checkStatus: (param01, param02) => {
    return axiosApi.post(`/zaloPay/status/${param01}/${param02}`);
  },
};

export default zaloApi;
