/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// register user
const userApi = {
    // đăng kí tài khoản
    postRegister: (params) => {
        const url = '/users/register';
        // console.log('params', params)
        return axiosClient.post(url, params);
    },
    // đăng nhập với email
    loginEmail: (params) => {
        const url = '/users/login';
        return axiosClient.post(url, params);
    },
    // đăng nhập với google
    loginGoogle: (params) => {
        const url = '/users/logingoogle';
        return axiosClient.post(url, params);
    },
    // đăng nhập với số điện thoại => firebase
    loginPhoneNumber: (params) => {
        const url = '/users/loginphonenumber';
        return axiosClient.post(url, params);
    }
};

export default userApi;