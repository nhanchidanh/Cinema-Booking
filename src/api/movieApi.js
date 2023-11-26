import axiosApi from "./axisosApi";

const movieApi = {
  getMovies: () => {
    return axiosApi.get("/movie");
  },

  getMovieByType: (type) => {
    return axiosApi.get(`/movie/status/${type}`);
  },
  
  createMovie: (data) => {
    return axiosApi.post("/movie", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getMovieById: (id)=>{
    return axiosApi.get(`/movie/${id}`);
  },

  updateMovie: (id, data) => {
    return axiosApi.patch(`/movie/${id}`, data);
  },

  deleteMovie: (id) => {
    return axiosApi.delete(`/movie/${id}`);
  }
};

export default movieApi;
