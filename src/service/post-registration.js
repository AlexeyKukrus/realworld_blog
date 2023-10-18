import instance from './instance';

const postRegistration = async (userData) => {
  const res = await instance.post('users', userData);
  return res;
};

export default postRegistration;
