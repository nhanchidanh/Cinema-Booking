const ReservationService = require("../services/reservation.service");
const TTL_RESERVATION = 600;

class ReservationController {
    async create(req, res){
        try{
            const reservation = req.body;
            const result = await ReservationService.create(reservation, TTL_RESERVATION);
            res.status(200).json(result);
        }catch(err){
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }

    async cancel(req, res){
        try{
            const reservation = req.body;
            const result = await ReservationService.cancel(reservation);
            res.status(200).json(result);
        }catch(err){
            res.status(500).json({
                status: 500,
                message: err.message,
            });
        }
    }
}

module.exports = new ReservationController();