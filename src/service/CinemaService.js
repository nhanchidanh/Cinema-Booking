import cinameApi from "../api/cinameApi";
import showApi from "../api/showApi";

export const getCinemaById = async (id) => {
  try {
    const data = await cinameApi.featchCinemasById(id);
    return data;
  } catch (error) {
    throw error;
  }
};
