import axiosApi from "./axisosApi";

const showApi = {
  getShow: () => {
    return axiosApi.get("/show");
  },

  getShowByMovieAndDate: (idMovie, date) => {
    return axiosApi.get(`/showTimesMovie/show/movie/${idMovie}/date/${date}`);
  },
};

export default showApi;
