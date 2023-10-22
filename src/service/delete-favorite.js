import instance from './instance';

const deleteFavorite = async (slug) => {
  const res = await instance.delete(`articles/${slug}/favorite`);
  return res;
};

export default deleteFavorite;
