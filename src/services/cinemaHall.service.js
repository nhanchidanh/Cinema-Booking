const CinemaHallRepository = require('../repositories/cinemaHalls.repository');
const cinemaHallSeatService = require('./cinemaHallSeat.service');

class CinemaHallService {

    async getAllCinemaHall(query) {
        return await CinemaHallRepository.getAllCinemaHall(query);
    }

    async getCinemaHallById(id) {
        return await CinemaHallRepository.getCinemaHallById(id);
    }

    async getCinemaHallByName(name) {
        return await CinemaHallRepository.getCinemaHallByName(name);
    }

    async getCinemaHallByCinemaId(cinemaId, query) {
        return await CinemaHallRepository.getCinemaHallByCinemaId(cinemaId,query);
    }

    async createCinemaHall(cinemaHall) {

        const {id} = await CinemaHallRepository.createCinemaHall(cinemaHall);
        let idProduct;
        let arrSeat = [
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "K",
        ];
        if(cinemaHall.totalSeats === 81){
            for(let i = 1; i <= 9; i++){
                for(let j = 0;j<arrSeat.length; j++){
                    if( arrSeat[j] === "K"){
                        idProduct = 3;
                    }else{
                        idProduct = 1;
                    }
                    let seat = {
                        seatRow: i,
                        seatColumn:arrSeat[j] ,
                        idCinemaHall:id,
                        idProduct:idProduct
                    }                    
                    await cinemaHallSeatService.createCinemaHallSeat(seat);
                }
            }
        }
        // return await CinemaHallRepository.createCinemaHall(cinemaHall);
        return { message: 'Create success' };
    }

    async updateCinemaHall(id, cinemaHall) {
        await CinemaHallRepository.updateCinemaHall(id, cinemaHall);
        return { message: 'Update success' };
    }

    async deleteCinemaHall(id) {
        await CinemaHallRepository.updateCinemaHall(id, { isDelete: true });
        return { message: 'Delete success' };
    }

}

module.exports = new CinemaHallService();