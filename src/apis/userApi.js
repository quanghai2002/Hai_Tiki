/* eslint-disable indent */
import axiosClient from './axiosClient.js';

// register user
const userApi = {
    postRegister: (params) => {
        const url = '/users/register';
        // console.log('params', params)
        return axiosClient.post(url, params);
    },
    loginEmail: (params) => {
        const url = '/users/login';
        return axiosClient.post(url, params);
    }

    // ,
    // loginGoogle: (params) => {
    //     const url = '/users/logingoogle';
    //     return axiosClient.post(url, params);
    // },
    // loginPhoneNumber: (params) => {
    //     const url = '/users/loginphonenumber';
    //     return axiosClient.post(url, params);
    // }
};

export default userApi;