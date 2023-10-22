import instance from './instance';

const postFavorite = async (slug) => {
  const res = await instance.post(`articles/${slug}/favorite`);
  return res;
};

export default postFavorite;
