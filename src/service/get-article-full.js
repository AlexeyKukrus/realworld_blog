import instance from './instance';

const getArticleFull = async (slug) => {
  const res = await instance.get(`articles/${slug}`);
  return res;
};

export default getArticleFull;
