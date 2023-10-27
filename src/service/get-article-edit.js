import instance from './instance';

const getArticleEdit = async (slug) => {
  const res = await instance.get(`articles/${slug}`);
  console.log(res);
  return res;
};

export default getArticleEdit;
