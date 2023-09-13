/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// danh mục sản phẩm => category
const categoryApi = {

    insertCategory: (params) => {
        // params => { }
        const url = '/category/insert';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },
};

export default categoryApi;