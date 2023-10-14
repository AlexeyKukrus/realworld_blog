import { initialStateArticles } from '../initial-state';
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_FULL_REQUEST,
  FETCH_ARTICLE_FULL_SUCCESS,
  FETCH_ARTICLE_FULL_FAILURE,
} from '../actions/action-types';

const reducerArticles = (state = initialStateArticles, action) => {
  switch (action.type) {
    /* ALL ARTICLES */
    case FETCH_ARTICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ARTICLE_FULL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLE_FULL_SUCCESS:
      return {
        ...state,
        loading: false,
        article: { ...action.payload },
      };
    case FETCH_ARTICLE_FULL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducerArticles;
