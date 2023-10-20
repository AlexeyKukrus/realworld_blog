import { initialStateArticles } from '../initial-state';
import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_FULL_REQUEST,
  FETCH_ARTICLE_FULL_SUCCESS,
  FETCH_ARTICLE_FULL_FAILURE,
  POST_NEW_ARTICLE,
  POST_NEW_ARTICLE_SUCCESS,
  POST_NEW_ARTICLE_FAILURE,
  POST_NEW_ARTICLE_SERVER_FAILURE,
  PUT_EDIT_ARTICLE,
  PUT_EDIT_ARTICLE_SUCCESS,
  PUT_EDIT_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE_SERVER_FAILURE,
  FETCH_EDIT_ARTICLE_REQUEST,
  FETCH_EDIT_ARTICLE_SUCCESS,
  FETCH_EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SERVER_FAILURE,
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
    case POST_NEW_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_NEW_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        created: true,
      };
    case POST_NEW_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_NEW_ARTICLE_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        server: action.payload,
      };
    case PUT_EDIT_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PUT_EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        edited: true,
      };
    case PUT_EDIT_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PUT_EDIT_ARTICLE_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        server: action.payload,
      };
    case FETCH_EDIT_ARTICLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        article: { ...action.payload },
      };
    case FETCH_EDIT_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        statusDelete: true,
      };
    case DELETE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ARTICLE_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        server: action.payload,
      };
    default:
      return state;
  }
};

export default reducerArticles;
