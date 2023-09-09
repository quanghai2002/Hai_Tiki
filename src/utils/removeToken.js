import Cookies from 'universal-cookie';
const removeToken = (nameToken) => {
  const cookies = new Cookies();
  return cookies.remove(nameToken);
};

export default removeToken;