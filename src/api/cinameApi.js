import axiosApi from "./axisosApi";

const cinameApi = {
  getCinemas: () => {
    return axiosApi.get("/cinema");
  },
  featchCinemasById: (id) => {
    return axiosApi.get(`/cinema/${id}`);
  },

  getHallByCinema: (id) => {
    return axiosApi.get(`cinemaHall/cinema/${id}`);
  },
};

export default cinameApi;
