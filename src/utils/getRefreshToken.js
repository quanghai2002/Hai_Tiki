import Cookies from 'universal-cookie';
const getrefreshToken = () => {
  const cookies = new Cookies();
  return cookies.get('refreshToken');
};

export default getrefreshToken;