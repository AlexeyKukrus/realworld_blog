import instance from './instance';

const putEditProfile = async (userData) => {
  const res = await instance.put('user', userData);
  return res;
};

export default putEditProfile;
