const MovieRepository = require("../repositories/movie.repository");
const redisDb = require("../config/redis");
const s3Service = require("./awsS3.service");
const MovieCinemaService = require("./cinemaMovie.service");
const moment = require("moment");

class MovieService {
  async getAllMovie(query) {
    return  await MovieRepository.getAllMovie(query);
  }
  

  async getMovieById(id) {
    return await MovieRepository.getMovieById(id);
  }

  async searchMovieByName(nameMovie){
    return await MovieRepository.searchMovieByName(nameMovie);
  }

  async getMovieByCinemaId(id) {
    return await MovieRepository.getMovieByCinemaId(id);
  }

  async createMovie(req) {
    const movie = req.body;
    const image = req.file;
    if(image) {
      const result = await s3Service.uploadFile(image);
      movie.image = result
    }
    movie.codeMovie = `MOV${movie.codeMovie}`;
    const codeMovieIsExist = await this.getMovieByCode(movie.codeMovie)
    if ( codeMovieIsExist ) {
      throw new Error("Mã phim đã tồn tại")
    }
    // const newMovie = 
    // const { id } = newMovie;
    // const idCinema = movie.idCinema;
    // await MovieCinemaService.createCinemaMovie({ idCinema, idMovie: id });
    return await MovieRepository.createMovie(movie);
  }

  async getMovieByCode(codeMovie){
    return await MovieRepository.getMovieByCode(codeMovie);
  }

  async getMovieByStatus(status){
    return await MovieRepository.getMovieByStatus(status);
  }

  async updateMovie(id, req) {
    const movie = req.body;
    const image = req.file;
    if(image) {
      const result = await s3Service.uploadFile(image);
      movie.image = result
    }
    await MovieRepository.updateMovie(id, movie);
    return { message: "Update success" };
  }

  async updateMovieStatus(id, status) {
    await MovieRepository.updateMovieStatus(id, status);
    const isExistCacheMovies = await redisDb.exists("movies");
    if (isExistCacheMovies) {
      await redisDb.deleteKey("movies");
    }
    return { message: "Update success" };
  }

  async updateMovieActive(id, active) {
    await MovieRepository.updateMovieActive(id, active);
    const isExistCacheMovies = await redisDb.exists("movies");
    if (isExistCacheMovies) {
      await redisDb.deleteKey("movies");
    }
    return { message: "Update success" };
  }

  async deleteMovie(id) {
    await this.updateMovieStatus(id, 3);
    return { message: "Delete success" };
  }
}

module.exports = new MovieService();
