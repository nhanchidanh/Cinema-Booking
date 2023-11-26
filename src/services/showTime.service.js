const ShowTimeRepository = require("../repositories/showTime.repository");

class ShowTimeService {
  async getShowTimes() {
    return await ShowTimeRepository.getShowTimes();
  }

  async getTime(id) {
    return await ShowTimeRepository.getTime(id);
  }
}

module.exports = new ShowTimeService();
