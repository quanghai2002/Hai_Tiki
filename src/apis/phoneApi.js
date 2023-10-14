/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// lấy tất cả sản phẩm mà không có pagination
const phoneApi = {
    // lấy tất cả các sản phẩm
    // localhost:8080/api/phone?page=1&size=18
    // LẤY CÁC SẢN PHẨM VÀ PHÂN TRANG SẢN PHẨM
    getPhonePagination: (pageNumber = 1) => {
        const url = `/phone?page=${pageNumber}&size=15`;
        return axiosClient.get(url);
    },


    // SORT THEO GIÁ TỪ CAO => THẤP
    getPhonePriceDES: (pageNumber = 1) => {
        const url = `/phone/sort/price?page=${pageNumber}&size=15`;
        return axiosClient.get(url);
    },


    // SORT THEO GIÁ TỪ THẤP=> CAO
    getPhonePriceASC: (pageNumber = 1) => {
        const url = `/phone/sort/price_Asc?page=${pageNumber}&size=15`;
        return axiosClient.get(url);
    },

    // LẤY TẤT CẢ SẢN PHẨM KO PAGINATION
    getAllPhones: () => {
        // params => { }
        const url = '/phone/getallphonenopagination';
        // console.log('params', params)
        return axiosClient.get(url);
    },

    // xóa sản phẩm
    deletePhones: (params) => {
        // params => { }
        const url = '/phone/deletemany/deletemanyphone';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },
    // Thêm sản phẩm
    insetPhone: (params) => {
        const url = '/phone/insert';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },

    // LẤY 1 PHONE THEO ID
    getPhoneBuyID: (idPhone) => {
        const url = `/phone/getonephone/${idPhone}`;
        return axiosClient.get(url);
    },
    // CẬP NHẬT 1 SẢN PHẨM
    updatePhone: (params) => {
        const url = '/phone/update';
        // console.log('params', params);
        return axiosClient.patch(url, params);
    },

};

export default phoneApi;