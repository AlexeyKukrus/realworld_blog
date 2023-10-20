import instance from './instance';

const postNewArticle = async (articleData) => {
  const res = await instance.post('articles', articleData);
  return res;
};

export default postNewArticle;
