const ShowTimeController = require("../controllers/showTime.controller");
const router = require("express").Router();

router.get("/", ShowTimeController.getShowTimes);
router.get("/:id", ShowTimeController.getTime);

module.exports = router;
