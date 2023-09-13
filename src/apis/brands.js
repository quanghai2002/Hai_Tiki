/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// danh mục sản phẩm => category
const brandsApi = {

    insertBrand: (params) => {
        // params => { }
        const url = '/brands/insert';
        // console.log('params', params);
        return axiosClient.post(url, params);
    },
};

export default brandsApi;