import promotionApi from "../api/promotionApi";


export const checkPromotionCinema = async (data) => {
  try {
    const response = await promotionApi.checkPromotion(data)
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPromotionActive = async () => {
  try {
    const response = await promotionApi.getAllActivePromotionLine()
    return response;
  } catch (error) {
    throw error;
  }
};
