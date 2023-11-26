import cinemaHallApi from "../api/cinemaHallApi";

export const getAllSeatByIdHall = async (id) => {
  try {
    const data = await cinemaHallApi.getCinemaHallSeatById(id);
    return data;
  } catch (error) {
    throw error;
  }
};


export const getAllHalls = async (id) => {
  try {
    const data = await cinemaHallApi.getAllHall();
    return data;
  } catch (error) {
    throw error;
  }
};

