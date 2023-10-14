import getAllArticles from '../../service/get-all-articles';
import getArticleFull from '../../service/get-article-full';

import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_FULL_REQUEST,
  FETCH_ARTICLE_FULL_SUCCESS,
  FETCH_ARTICLE_FULL_FAILURE,
} from './action-types';

export const fetchArticlesRequest = () => ({
  type: FETCH_ARTICLES_REQUEST,
});
export const fetchArticlesSuccess = (articles, articlesCount) => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles, articlesCount },
});
export const fetchArticlesFailure = (error) => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: error,
});
export const fetchArticleFullRequest = () => ({
  type: FETCH_ARTICLE_FULL_REQUEST,
});
export const fetchArticleFullSuccess = (article) => ({
  type: FETCH_ARTICLE_FULL_SUCCESS,
  payload: article,
});
export const fetchArticleFullFailure = (error) => ({
  type: FETCH_ARTICLE_FULL_FAILURE,
  payload: error,
});

export const getArticles = (page) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest());
      const res = await getAllArticles(page);
      const { articles, articlesCount } = res.data;
      dispatch(fetchArticlesSuccess(articles, articlesCount));
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message));
    }
  };
};

export const getAnArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticleFullRequest());
      const res = await getArticleFull(slug);
      const { article } = res.data;
      dispatch(fetchArticleFullSuccess(article));
    } catch (error) {
      dispatch(fetchArticleFullFailure(error.message));
    }
  };
};
