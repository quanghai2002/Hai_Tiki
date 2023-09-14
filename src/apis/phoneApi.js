/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// lấy tất cả sản phẩm mà không có pagination
const phoneApi = {
    // lấy tất cả các sản phẩm
    // localhost:8080/api/phone?page=1&size=18

    getAllPhones: () => {
        // params => { }
        const url = '/phone/getallphonenopagination';
        // console.log('params', params)
        return axiosClient.get(url);
    },
    deletePhones: (params) => {
        // params => { }
        const url = '/phone/deletemany/deletemanyphone';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },
    insetPhone: (params) => {
        const url = '/phone/insert';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },
    getPhoneBuyID: (idPhone) => {
        // console.log({ idPhone });
        const url = `/phone/${idPhone}`;
        // console.log('params', params);
        return axiosClient.get(url);
    },

};

export default phoneApi;