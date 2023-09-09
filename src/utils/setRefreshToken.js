import Cookies from 'universal-cookie';
const setRefreshToken = (token) => {
  const cookies = new Cookies();
  return cookies.set('refreshToken', token, { path: '/' });
};

export default setRefreshToken;