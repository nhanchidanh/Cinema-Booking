const redisDb = require("../config/redis");


class ReservationService {
    async create(body,ttl){
        try {
            body.seats.forEach(async (seat) => {
                await redisDb.set(body.showTime_id+"-"+seat, JSON.stringify({
                    showTime_id: body.showTime_id,
                    staff_id: body?.staff_id,
                    seat_id: seat,
                    status: 0,
                    createAt : new Date()
                }),ttl);
            });
            const isExistCacheSeats = await redisDb.exists(`viewSeats-${body.showTime_id}`);
            if(isExistCacheSeats){
                await redisDb.deleteKey(`viewSeats-${body.showTime_id}`);
            }
            return { message: "Create success" };

        } catch (error) {
            console.log(error);
        }
    }

    async cancel(body){ 
        body.seats.forEach(async (seat) => {
            await redisDb.deleteKey(body.showTime_id+"-"+seat);
        });
        const isExistCacheSeats = await redisDb.exists(`viewSeats-${body.showTime_id}`);
        if(isExistCacheSeats){
            await redisDb.deleteKey(`viewSeats-${body.showTime_id}`);
        }
        return { message: "Cancel success" };
    }
}

module.exports = new ReservationService();