const showTimesMovieService = require("../services/showTimesMovie.service");

class showTimesMovieController {
  async getShowTimesMovieByShowId(req, res) {
    const showTimesMovie = await showTimesMovieService.getByShowId(
      req.params.id
    );
    if (showTimesMovie == null)
      return res.status(404).json({ message: "Not found" });
    res.json(showTimesMovie);
  }

  async getShowTimesMovieByShowIdWithDate(req, res) {
    const showTimesMovie = await showTimesMovieService.getByShowIdWithDate(
      req.params.idMovie,
      req.params.date
    );
    if (showTimesMovie == null)
      return res.status(404).json({ message: "Not found" });
    res.json(showTimesMovie);
  }

  async getShowTimesCinemaByShowIdWithDate(req, res) {
    const showTimesMovie = await showTimesMovieService.getByCinemaWithDate(
      req.params.idCinema,
      req.params.date
    );
    if (showTimesMovie == null)
      return res.status(404).json({ message: "Not found" });
    res.json(showTimesMovie);
  }

  async getSeatsByShowMovieId(req, res) {
    const showTimesMovie = await showTimesMovieService.getSeatsByShowMovieId(
      req.params.id
    );
    if (showTimesMovie == null)
      return res.status(404).json({ message: "Not found" });
    res.json(showTimesMovie);
  }

  async deleteShowTimesMovie(req, res) {
    try {
      const showTimesMovie = await showTimesMovieService.deteteWithShowDate(
        req.params.id,
        req.params.date
      );
      res.json(showTimesMovie);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
    
  }

  async getByShowIdAndDate(req, res) {
    const showTimesMovie = await showTimesMovieService.getByShowIdAndDate(
      req.params.idShow,
      req.params.date
    );
    if (showTimesMovie == null)
      return res.status(404).json({ message: "Not found" });
    res.json(showTimesMovie);
  }

  async getShowMovieShowAndMovie(req, res) {
    console.log('getShowMovieShowAndMovie');
    const showTimesMovie = await showTimesMovieService.getShowMovieShowAndMovie(
      req.query
    );
    res.json(showTimesMovie);
  }

  async updateShowTimesMovie(req, res) {
    try {
      const rs = await showTimesMovieService.updateShowTimeByShowIdAndDate(
        req.params.idShow,
        req.body
      );
      if (rs.length > 0)
        return res.status(409).json({
          message: "Conflict",
          data: rs,
        });
      res.status(200).json({
        message: "Update show time successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async getShowTimeUnique(req, res) {
    const showTimesMovie = await showTimesMovieService.getShowTimeUnique(
      req.params.idShow
    );
    res.json(showTimesMovie);
  }
}

module.exports = new showTimesMovieController();
