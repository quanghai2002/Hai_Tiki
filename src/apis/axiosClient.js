import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
// lấy token => từ cookie
import getTokenCookie from '~/utils/getTokenCookie.js';
import getrefreshToken from '~/utils/getRefreshToken.js';
import setTokenCookie from '~/utils/setTokenCookie.js';
import setRefreshToken from '~/utils/setRefreshToken.js';
import jwt_decode from 'jwt-decode';


// function refreshToken
const refreshToken = async (refreshToken) => {
  try {
    const response = axios.post(`${import.meta.env.VITE_API_URL}/users/refreshToken`, {
      refreshToken: refreshToken
    });
    return response;

  } catch (error) {
    console.log('error', error);
  }
};



// axios clients
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});


// trước khi API được gửi => kiểm tra token => gắn vào Authorization
axiosClient.interceptors.request.use(async (config) => {

  // refresh token
  // lấy token từ cookies => nếu không có => đồng nghĩa chưa đăng nhập


  const token = getTokenCookie();


  // --------Nếu có token => Đã đăng nhập rồi thì mới cho check token => Không Đăng Nhập thì để Bình Thường Thôi
  if (token) {
    // giải xem token => còn hạn không => nếu exp => refresh token
    const decodedToken = jwt_decode(token);
    // exp
    const expToken = decodedToken?.exp;
    // console.log('expToken', expToken);
    // kiểm tra token còn hạn không
    const date = new Date();


    if (expToken < date.getTime() / 1000) {
      console.log('token đã hết hạn => refresh TOKEN THÀNH CÔNG=> gắn Authorization lại  ');
      // nếu token hết hạn => gọi api refresh token
      const refreshTokenID = getrefreshToken();
      const newToken = await refreshToken(refreshTokenID);
      // console.log('new token: ', newToken.data);

      // set lại acsetToken và refresh token => vào cookie
      setTokenCookie(newToken.data?.newAccessToken);
      setRefreshToken(newToken.data?.newRefreshToken);

      // handel token => gắn Authorization => bằng token mới
      config.headers = {
        Authorization: `Bearer ${newToken.data?.newAccessToken}`
      };
    } else {
      console.log('token còn hạn => oke');
      // nếu token còn hạn => gắn vào như bình thường
      config.headers = {
        Authorization: `Bearer ${token}`
      };
    }

  }
  return config;
});



axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);


export default axiosClient;
