import movieApi from "../api/movieApi";
import zaloApi from "../api/zaloApi";

export const createPayZalo = async (money) => {
  try {
    const data = await zaloApi.create(money)
    return data;
  } catch (error) {
    throw error;
  }
};



export const checkStatus = async (p1, p2) => {
    try {
      const data = await zaloApi.checkStatus(p1,p2)
      return data;
    } catch (error) {
      throw error;
    }
};
  