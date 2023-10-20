import instance from './instance';

const deleteArticle = async (slug) => {
  const res = await instance.delete(`articles/${slug}`);
  return res;
};

export default deleteArticle;
