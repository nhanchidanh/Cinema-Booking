import axiosApi from "./axisosApi";

const cinemaHallApi = {
  getCinemaHalls: (id) => {
    return axiosApi.get(`/cinemaHall/cinema/${id}`);
  },

  getCinemaHallSeatById: (id) => {
    return axiosApi.get(`/cinemaHallSeat/cinemaHall/${id}`);
  },

  getSeatById: (id) => {
    return axiosApi.get(`/cinemaHallSeat/${id}`);
  },

  updateSeat: (id, data) => {
    return axiosApi.put(`/cinemaHallSeat/${id}`, data);
  },
  getAllHall: () => {
    return axiosApi.get(`/cinemaHall`);
  },
}

export default cinemaHallApi;
