
const CinemaRepository = require('../repositories/cinema.repository');
const CinemaHallRepository = require('../repositories/cinemaHalls.repository');

class CinemaService {

    async getAllCinema(query) {
        const data = await CinemaRepository.getAllCinema(query);
        await Promise.all(data.map(async (cinema) => {
            const countCinemaHall = await CinemaHallRepository.countHallByCinemaId(cinema.id);
            cinema.dataValues.countCinemaHall = countCinemaHall;
        }))
        return data;
    }

    async getCinemaById(id) {
        return await CinemaRepository.getCinemaById(id);
    }

    async getCinemaByName(name) {
        return await CinemaRepository.getCinemaByName(name);
    }

    async createCinema(cinema) {
        cinema.codeCinema = `CIN${cinema.codeCinema}`
        const codeIsExist = await CinemaRepository.getCinemaByCode(cinema.codeCinema);
        if (codeIsExist) {
            throw new Error('Mã rạp đã tồn tại');
        }
        return await CinemaRepository.createCinema(cinema);
    }

    async updateCinema(id, cinema) {
        await CinemaRepository.updateCinema(id, cinema);
        return { message: 'Update success' };
    }

    async deleteCinema(id) {
        await CinemaRepository.updateCinema(id, { status: 3 })
        return { message: 'Delete success' };
    }

    async getCinemaByCity(city) {
        return await CinemaRepository.getCinemaByCity(city);
    }

    async getCinemaActive() {
        return await CinemaRepository.getCinemaActive();
    }

}

module.exports = new CinemaService();