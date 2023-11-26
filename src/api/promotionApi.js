import axiosApi from "./axisosApi";

const promotionApi = {
  getPromotionHeader: () => {
    return axiosApi.get("/promotionHeader");
  },
  updatePromotionHeader: (data) => {
    return axiosApi.put(`/promotionHeader/${data.id}`, data);
  },
  createPromotionHeader: (data) => {
    return axiosApi.post("/promotionHeader", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getPromotionHeaderById: (id) => {
    return axiosApi.get(`/promotionHeader/${id}`);
  },
  getPromotionLineByHeader: (_id) => {
    return axiosApi.get(`/promotionLine/promotionHeader/${_id}`);
  },
  checkPromotion: (data) => {
    return axiosApi.post(`/promotionHeader/check/promotion`, data);
  },

  getAllActivePromotionLine: (all) => {
    return axiosApi.get(`/promotionLine/active/all`);
  },
};

export default promotionApi;
