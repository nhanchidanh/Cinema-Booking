const ReservationController = require("../controllers/reservation.controller");
const router = require("express").Router();

router.post("/", ReservationController.create);
router.put("/", ReservationController.cancel);

module.exports = router;