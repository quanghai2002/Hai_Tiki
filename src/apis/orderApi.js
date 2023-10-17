/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// register user
const orderApi = {
    // THÊM ĐƠN HÀNG MỚI
    addOrderDatabase: (params) => {
        const url = '/order/insert';
        return axiosClient.post(url, params);
    },

};

export default orderApi;