const MovieService = require("../services/movie.service");
const CinemaMovieService = require("../services/cinemaMovie.service");

class MovieController {
  //[GET] /movie
  async getAllMovie(req, res) {
    try {
      const rs = await MovieService.getAllMovie(req.query);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /movie/:id
  async getMovieById(req, res) {
    try {
      const rs = await MovieService.getMovieById(req.params.id);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /movie/search/?name=...
  async searchMovieByName(req, res) {
    const name = req.params.name;
    try {
      const rs = await MovieService.searchMovieByName(name);
      if(rs.length === 0) res.status(404).json({status:404,message:"Not found"});
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[POST] /movie
  async createMovie(req, res) {
    try {
      const rs = await MovieService.createMovie(req);
      res.status(201).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[PUT] /movie/:id
  async updateMovie(req, res) {
    try {
      const rs = await MovieService.updateMovie(req.params.id, req);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[DELETE] /movie/:id
  async deleteMovie(req, res) {
    try {
      const rs = await MovieService.deleteMovie(req.params.id);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /movie/cinema/:id
  async getMovieByCinemaId(req, res) {
    try {
      const rs = await CinemaMovieService.getCinemaMovieByCinemaId(req.params.id);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async getMovieByStatus(req, res) {
    try {
      const rs = await MovieService.getMovieByStatus(req.params.status);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new MovieController();