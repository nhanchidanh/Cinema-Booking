import movieApi from "../api/movieApi";

export const getFilmById = async (id) => {
  try {
    const data = await movieApi.getMovieById(id);
    return data;
  } catch (error) {
    throw error;
  }
};
