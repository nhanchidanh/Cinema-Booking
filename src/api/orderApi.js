import axiosApi from "./axisosApi";

const orderApi = {
    createOrder: (data) => {
        return axiosApi.post("/order", data);
    },
    getAll: () =>{
        return axiosApi.get("/order");
    },
    getById: (id) => {
        return axiosApi.get(`order/${id}`);
    },
    getDetail: (id) => {
        return axiosApi.get(`order/${id}/orderDetails`);
    },
    refund: (id,data) => {
        return axiosApi.put(`order/refund/${id}`, data);
    },
    getByType: (type) => {
        return axiosApi.get(`order/type/${type}`);
    },
    getOrdersByIdCustomer: (type) => {
        return axiosApi.get(`order/customer/${type}`);
    },
    
};

export default orderApi;