const ShowTime = require("../models/showTime");

class ShowTimeRepository{

    async getShowTimes(){
        return await ShowTime.findAll();
    }

    async getTime(id){
        return await ShowTime.findOne({
            where: {
                id: id
            },
            attributes: ["showTime"],
        });
    }
}

module.exports = new ShowTimeRepository();