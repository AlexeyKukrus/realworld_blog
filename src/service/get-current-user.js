import instanceAxios from './instance';

const getCurrentUser = async () => {
  const res = await instanceAxios.get('user');
  return res;
};

export default getCurrentUser;
