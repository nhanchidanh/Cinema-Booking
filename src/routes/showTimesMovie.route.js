const showTimesMovieController = require("../controllers/showTimesMovie.controller");
const router = require("express").Router();

router.get(
  "/show/movie/:idMovie/date/:date",
  showTimesMovieController.getShowTimesMovieByShowIdWithDate
);
router.get(
  "/show/cinema/:idCinema/date/:date",
  showTimesMovieController.getShowTimesCinemaByShowIdWithDate
);

router.get(
  "/seats/:id",
  showTimesMovieController.getSeatsByShowMovieId
);

router.get("/:id", showTimesMovieController.getShowTimesMovieByShowId);

router.delete("/:id/date/:date", showTimesMovieController.deleteShowTimesMovie);
router.get("/show/:idShow/date/:date", showTimesMovieController.getByShowIdAndDate);

router.post("/showTime/:idShow", showTimesMovieController.updateShowTimesMovie);
router.get("/showTime/movie", showTimesMovieController.getShowMovieShowAndMovie)
router.get("/showTime/time/unique/:idShow", showTimesMovieController.getShowTimeUnique )

module.exports = router;
