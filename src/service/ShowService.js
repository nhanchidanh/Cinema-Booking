import showApi from "../api/showApi";

export const getShow = async (idMovie, date) => {
  try {
    const data = await showApi.getShowByMovieAndDate(idMovie, date);
    return data;
  } catch (error) {
    throw error;
  }
};
