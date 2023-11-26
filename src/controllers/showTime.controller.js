const ShowTimeService = require("../services/showTime.service");

class ShowTimeController {
  async getShowTimes(req, res) {
    const showTimes = await ShowTimeService.getShowTimes();
    res.json(showTimes);
  }

  async getTime(req, res) {
    const { id } = req.params;
    const showTime = await ShowTimeService.getTime(id);
    res.json(showTime);
  }
}

module.exports = new ShowTimeController();
