import instance from './instance';

const postLogin = async (userData) => {
  const res = await instance.post('users/login', userData);
  return res;
};

export default postLogin;
