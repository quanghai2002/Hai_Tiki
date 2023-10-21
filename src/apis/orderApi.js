/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// register user
const orderApi = {
    // THÊM ĐƠN HÀNG MỚI => THÊM MỚI 1 ĐƠN HÀNG
    addOrderDatabase: (params) => {
        const url = '/order/insert';
        return axiosClient.post(url, params);
    },

    // THÊM MỚI MANY NHIỀU ĐƠN HÀNG CÙNG 1 LÚC --- INSERT MANY
    addOrderMany: (params) => {
        const url = '/order/insertmany';
        return axiosClient.post(url, params);
    }

};

export default orderApi;