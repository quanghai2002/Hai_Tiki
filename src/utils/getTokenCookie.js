import Cookies from 'universal-cookie';
const getTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get('tokenID');
};

export default getTokenCookie;