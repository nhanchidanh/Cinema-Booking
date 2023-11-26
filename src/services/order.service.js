const OrderRepository = require('../repositories/order.repository');
const OrderDetailRepository = require('../repositories/orderDetail.repository');
const PromotionResultRepository = require('../repositories/promotionResult.repository');
const PriceLineRepository = require('../repositories/priceLine.repository');
const MemberShipRepository = require('../repositories/menberShip.repository');
const ReservationService = require('../services/reservation.service');
const sequelize = require('../config/database');
const MovieRepository = require('../repositories/movie.repository');
const moment = require('moment');
const customerRepository = require('../repositories/customer.repository');

class OrderService {

    async getAll() {
        return await OrderRepository.getAll();
    }

    async getById(id) {
        return await OrderRepository.getById(id);
    }

    async getByType(type, query) {
        return await OrderRepository.getByType(type, query);
    }

    async getByCustomerId(id) {
        const data = await OrderRepository.getByCustomerId(id);
        await Promise.all(data.map(async (order) => {
            const movie = await MovieRepository.getMovieById(order.ShowMovie.Show.Movie.id);
            console.log(movie.duration);
            console.log(order.ShowMovie.ShowTime.showTime);
            const end_time = moment(order.ShowMovie.ShowTime.showTime,'HH:mm').add(movie.duration, 'minutes').format('HH:mm');
            console.log(end_time);
            order.dataValues.ShowMovie.dataValues.ShowTime.dataValues.end_time = end_time;
        }));
        return data;
    }

    async getByStaffId(id) {
        return await OrderRepository.getByStaffId(id);
    }

    async create(order) {
        let totalDiscount = 0;
        if ( order.promotionApplicalbe && order.promotionApplicalbe.length > 0 ) {
            totalDiscount = order.promotionApplicalbe.reduce((total, promotion) => {
                return total + promotion.discount;
            }, 0);
        }
        let data ;
        try {
            await sequelize.transaction(async (t) => {

                const payloadOrder = {
                    paymentMethod: order.paymentMethod,
                    totalPrice: order.totalPrice,
                    idShowMovie: order.idShowMovie,
                    idCustomer: order.idCustomer,
                    idStaff: order?.idStaff,
                    totalDiscount: totalDiscount,
                    paymentMethod: order.paymentMethod,
                    numberSeat: order.seats.length,
                };
                const newOrder = await OrderRepository.create(payloadOrder, { transaction: t });

                const payloadOrderDetail = order.seats.map((seat) => {
                    return {
                        price: seat.price,
                        qty: seat.qty,
                        idSeat: seat.idSeat,
                        idProduct: seat.idProduct,
                        type: 1,
                        idOrder: newOrder.id,
                    }
                });
                // save order detail and plus point for customer
                const orderDetail = await OrderDetailRepository.bulkCreate(payloadOrderDetail, { transaction: t });

                if(order.idCustomer !== 36 ){
                    const currentPoint = await MemberShipRepository.getMemberShipByCustomerId(order.idCustomer);
                    const newPoint = Number(currentPoint.dataValues.currentPoint) + Number(orderDetail.length);
                    await MemberShipRepository.updatePoint(order.idCustomer, newPoint, { transaction: t });
                    if ( newPoint >=25 && newPoint < 80){
                        await MemberShipRepository.updateRank(order.idCustomer, 3, { transaction: t });
                        await customerRepository.updateRank(order.idCustomer, 3, { transaction: t });
                    } 
                    if ( newPoint >=80 ){
                        await MemberShipRepository.updateRank(order.idCustomer, 4, { transaction: t });
                        await customerRepository.updateRank(order.idCustomer, 4, { transaction: t });
                    }
                }
                // if order have product sp
                if( order.product_sp && order.product_sp.length > 0) {
                    const payloadOrderDetailSp = order.product_sp.map((product) => {
                        return {
                            idOrder: newOrder.id,
                            idProduct: product.id,
                            qtyProduct: product.qty,
                            priceProduct: product.price,
                            type: 2,
                        };
                    });
                    await OrderDetailRepository.bulkCreate(payloadOrderDetailSp, { transaction: t });
                }
                // if order have promotion
                if( order.promotionApplicalbe && order.promotionApplicalbe.length > 0) {
                    for(let i = 0; i < order.promotionApplicalbe.length; i++) {
                        // if promotion type receive product -> save product to order detail and save promotion to promotion result
                        // if(order.promotionApplicalbe[i].type === "2") {
                        //     const price = await PriceLineRepository.getPriceByProduct(order.promotionApplicalbe[i].productReceived_id);
                        //     const discount = Number(price.dataValues.price) * Number(order.promotionApplicalbe[i].qtyReceived);
                        //     const payloadOrderDetailPromotion = {
                        //         idOrder: newOrder.id,
                        //         idProductReceived: order.promotionApplicalbe[i].productReceived_id,
                        //         qtyProductReceived: order.promotionApplicalbe[i].qtyReceived,
                        //         priceProductReceived:0,
                        //         type: 3,
                        //     };
                        //     const payloadPromotion = {
                        //         idProductRecive: order.promotionApplicalbe[i].productReceived_id,
                        //         qtyRecive: order.promotionApplicalbe[i].qtyReceived,
                        //         moneyDiscount: discount,
                        //         idPromotionLine: order.promotionApplicalbe[i].promotionLine_id,
                        //         idOrder: newOrder.id,
                        //         idCustomer: order.idCustomer,
                        //         dateUsed: new Date(),
                        //     };
                            
                        //     await OrderDetailRepository.create(payloadOrderDetailPromotion, { transaction: t });
                        //     await PromotionResultRepository.create(payloadPromotion, { transaction: t });
                        // } 
                        // if promotion type discount money -> save promotion to promotion result
                        // else {
                            const payloadPromotion = {
                                moneyDiscount: order.promotionApplicalbe[i].discount,
                                idPromotionLine: order.promotionApplicalbe[i].promotionLine_id,
                                idOrder: newOrder.id,
                                idCustomer: order.idCustomer,
                                dateUsed: new Date(),
                            };
                            await PromotionResultRepository.create(payloadPromotion, { transaction: t });
                        // }
                    }
                }

                data = newOrder;
            });

            return {
                statusCode: 200,
                data: data,
                message: 'Create order successfully',
            }
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async refund(id,body) {
        try {
            await sequelize.transaction(async (t) => {
                let seats = [];
                const order = await OrderRepository.getById(id);
                // find order detail type seat
                const orderDetailTypeSeat = await OrderDetailRepository.getByType(id, 1);
                // minus point for customer
                // if(order.Customer.id !== 36){
                //     const currentPoint = await MemberShipRepository.getMemberShipByCustomerId(order.Customer.id);
                //     const newPoint = Number(currentPoint.dataValues.currentPoint) - Number(orderDetailTypeSeat.length);
                //     await MemberShipRepository.updatePoint(order.Customer.id, newPoint, { transaction: t });
                //     if ( newPoint >=25 && newPoint < 80){
                //         await MemberShipRepository.updateRank(order.idCustomer, 3, { transaction: t });
                //         await customerRepository.updateRank(order.idCustomer, 3, { transaction: t });
                //     } 
                //     if ( newPoint >=80 ){
                //         await MemberShipRepository.updateRank(order.idCustomer, 4, { transaction: t });
                //         await customerRepository.updateRank(order.idCustomer, 4, { transaction: t });
                //     }
                // }
                
                // find seat of order detail type seat
                orderDetailTypeSeat.forEach((item) => {
                    seats.push(item.idSeat);
                });
                // cancel reservation
                await ReservationService.cancel({showTime_id: order.ShowMovie.id, seats: seats})
                // update status promotion result
                await PromotionResultRepository.updateStatusByOrderId(id, 0, { transaction: t });
                // update status order
                await OrderRepository.updateStatus(id, 3, { transaction: t });
                body.refundDate = new Date();
                if(body.note){
                    body.note = body.note;
                } else {
                    body.note = 'Lý do khác!';
                }
                await OrderRepository.update(id, body, { transaction: t });
            });
            return {
                statusCode: 200,
                message: 'Refund successfully',
            }
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async updateStatus(id, status) {
        return await OrderRepository.updateStatus(id, status);
    }
}

module.exports = new OrderService();