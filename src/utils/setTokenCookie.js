import Cookies from 'universal-cookie';
const setTokenCookie = (token) => {
  const cookies = new Cookies();
  return cookies.set('tokenID', token, { path: '/' });
};

export default setTokenCookie;