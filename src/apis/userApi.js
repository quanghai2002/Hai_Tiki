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
    },
    // lấy thông tin 1 user
    getOneUser: (idUser) => {
        const url = `/users/getoneuser/${idUser}`;
        return axiosClient.get(url);
    },
    // cập nhật thông tin USER
    updateOneUser: (params) => {
        const url = '/users/updateuser';
        return axiosClient.patch(url, params);
    },
    // LẤY TẤT CẢ USER NO PAGINATIONS
    getAllUserNoPagination: () => {
        const url = '/users/getallusernopagination';
        return axiosClient.get(url);
    },
    // XÓA 1 USER
    deleteOneUser: (params) => {
        const url = `/users/delete/${params}`;
        return axiosClient.delete(url);
    }
};

export default userApi;