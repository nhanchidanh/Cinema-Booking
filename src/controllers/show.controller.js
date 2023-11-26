const ShowService = require("../services/show.service");

class ShowController {
  //[GET] /show
  async getAllShow(req, res) {
    try {
      const rs = await ShowService.getAllShow(req.query);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /show/:id
  async getShowById(req, res) {
    try {
      const rs = await ShowService.getShowById(req.params.id);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /show/movie/:movieId
  async getShowByMovieId(req, res) {
    try {
      const rs = await ShowService.getShowByMovieId(req);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[GET] /show/cinema/:cinemaId
  async getShowByCinemaId(req, res) {
    try {
      const rs = await ShowService.getShowByCinemaId(req);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[POST] /show
  async createShow(req, res) {
    try {
      console.log("p");
      const rs = await ShowService.createShow(req.body);
      if(rs.length > 0)
        return res.status(409).json({
          message: "Trùng lịch chiếu",
        });
      res.status(200).json({
        message: "Create show successfully",
      });

    } catch (err) { 
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[PUT] /show/:id
  async updateShow(req, res) {
    try {
      const rs = await ShowService.updateShow(req.params.id, req.body);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[DELETE] /show/:id
  async deleteShow(req, res) {
    try {
      const rs = await ShowService.deleteShow(req.params.id);
      res.status(200).json(rs);
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async checkIsExist(req,res) {
    try {
      const rs = await ShowService.checkIsExist(req.body);
      if(rs.length > 0)
        return res.status(409).json({
          message: "Trùng lịch chiếu",
          data: rs
        });
      res.status(200).json(rs);
    } catch (err) { 
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async checkShowTimeIsPassed(req,res) {
    try {
      const rs = await ShowService.checkShowTimeIsPassed(req.params.id);
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  async getListShowTimeIsPass(req,res) {
    try {
      const rs = await ShowService.getListShowTimeIsPass(req.query);
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  async updateStatusShow(req,res) {
    try {
      const rs = await ShowService.updateStatusShow(req.params.id, req.body);
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}

module.exports = new ShowController();
