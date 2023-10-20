import instance from './instance';

const putEditArticle = async (articleData, slug) => {
  const res = await instance.put(`articles/${slug}`, articleData);
  return res;
};

export default putEditArticle;
