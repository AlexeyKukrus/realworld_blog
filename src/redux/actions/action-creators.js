import getAllArticles from '../../service/get-all-articles';
import getArticleFull from '../../service/get-article-full';
import postRegistration from '../../service/post-registration';
import postLogin from '../../service/post-login';
import getCurrentUser from '../../service/get-current-user';
import putEditProfile from '../../service/put-edit-profile';
import postNewArticle from '../../service/post-new-article';
import putEditArticle from '../../service/put-edit-article';
import getArticleEdit from '../../service/get-article-edit';
import deleteArticle from '../../service/delete-article';
import postFavorite from '../../service/post-favorite';
import deleteFavorite from '../../service/delete-favorite';
import instance from '../../service/instance';

import {
  FETCH_ARTICLES_REQUEST,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_FULL_REQUEST,
  FETCH_ARTICLE_FULL_SUCCESS,
  FETCH_ARTICLE_FULL_FAILURE,
  POST_REGISTRATION,
  POST_REGISTRATION_SUCCESS,
  POST_REGISTRATION_FAILURE,
  POST_REGISTRATION_SERVER_FAILURE,
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SERVER_FAILURE,
  GET_CURRENT_USER,
  LOG_OUT,
  PUT_EDIT_PROFILE,
  PUT_EDIT_PROFILE_SUCCESS,
  PUT_EDIT_PROFILE_FAILURE,
  PUT_EDIT_PROFILE_SERVER_FAILURE,
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
  POST_FAVORITE,
  DELETE_FAVORITE,
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
export const postRegistr = () => ({
  type: POST_REGISTRATION,
});
export const postRegistrSuccess = (user) => ({
  type: POST_REGISTRATION_SUCCESS,
  payload: user,
});
export const postRegistrFailure = (error) => ({
  type: POST_REGISTRATION_FAILURE,
  payload: error,
});
export const postRegistrServerFailure = (error) => ({
  type: POST_REGISTRATION_SERVER_FAILURE,
  payload: error,
});
export const postLog = () => ({
  type: POST_LOGIN,
});
export const postLogSuccess = (user) => ({
  type: POST_LOGIN_SUCCESS,
  payload: user,
});
export const postLogFailure = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: error,
});
export const postLogServerFailure = (error) => ({
  type: POST_LOGIN_SERVER_FAILURE,
  payload: error,
});
export const getCurrUser = (user) => ({
  type: GET_CURRENT_USER,
  payload: user,
});
export const logOut = () => ({
  type: LOG_OUT,
});
export const putEditProf = () => ({
  type: PUT_EDIT_PROFILE,
});
export const putEditProfSuccess = (user) => ({
  type: PUT_EDIT_PROFILE_SUCCESS,
  payload: user,
});
export const putEditProfFailure = (error) => ({
  type: PUT_EDIT_PROFILE_FAILURE,
  payload: error,
});
export const putEditProfServerFailure = (error) => ({
  type: PUT_EDIT_PROFILE_SERVER_FAILURE,
  payload: error,
});
export const postNewArticles = () => ({
  type: POST_NEW_ARTICLE,
});
export const postNewArticlesSuccess = (article) => ({
  type: POST_NEW_ARTICLE_SUCCESS,
  payload: article,
});
export const postNewArticlesFailure = (error) => ({
  type: POST_NEW_ARTICLE_FAILURE,
  payload: error,
});
export const postNewArticlesServerFailure = (error) => ({
  type: POST_NEW_ARTICLE_SERVER_FAILURE,
  payload: error,
});
export const putEditArticles = () => ({
  type: PUT_EDIT_ARTICLE,
});
export const putEditArticlesSuccess = () => ({
  type: PUT_EDIT_ARTICLE_SUCCESS,
});
export const putEditArticlesFailure = (error) => ({
  type: PUT_EDIT_ARTICLE_FAILURE,
  payload: error,
});
export const putEditArticlesServerFailure = (error) => ({
  type: PUT_EDIT_ARTICLE_SERVER_FAILURE,
  payload: error,
});
export const fetchEditArticlesRequest = () => ({
  type: FETCH_EDIT_ARTICLE_REQUEST,
});
export const fetchEditArticlesSuccess = (article) => ({
  type: FETCH_EDIT_ARTICLE_SUCCESS,
  payload: article,
});
export const fetchEditArticlesFailure = (error) => ({
  type: FETCH_EDIT_ARTICLE_FAILURE,
  payload: error,
});
export const deleteArticles = () => ({
  type: DELETE_ARTICLE,
});
export const deleteArticlesSuccess = () => ({
  type: DELETE_ARTICLE_SUCCESS,
});
export const deleteArticlesFailure = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
});
export const deleteArticlesServerFailure = (error) => ({
  type: DELETE_ARTICLE_SERVER_FAILURE,
  payload: error,
});
export const postFavorited = (article) => ({
  type: POST_FAVORITE,
  payload: article,
});
export const deleteFavorited = (article) => ({
  type: DELETE_FAVORITE,
  payload: article,
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

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(postRegistr());
      const res = await postRegistration(userData);
      const { user } = res.data;
      dispatch(postRegistrSuccess(user));
    } catch (error) {
      if (error.response.status === 422) {
        dispatch(postRegistrServerFailure(error.response.data));
      } else {
        dispatch(postRegistrFailure(error.message));
      }
    }
  };
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(postLog());
      const res = await postLogin(userData);
      const { user } = res.data;
      const { token } = user;
      if (token !== localStorage.getItem('token')) {
        localStorage.setItem('token', token);
        instance.defaults.headers.Authorization = `Token ${token}`;
      }
      dispatch(postLogSuccess(user));
    } catch (error) {
      if (error.message === 'Request failed with status code 422') dispatch(postLogServerFailure(error));
      else dispatch(postLogFailure(error.message));
    }
  };
};

export const currUser = () => {
  return async (dispatch) => {
    try {
      const res = await getCurrentUser();
      const { user } = res.data;
      dispatch(getCurrUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProfile = (userData) => {
  return async (dispatch) => {
    try {
      const res = await putEditProfile(userData);
      const { user } = res.data;
      dispatch(putEditProfSuccess(user));
    } catch (error) {
      console.log(error.response);
      if (error.message === 'Request failed with status code 422') dispatch(putEditProfServerFailure(error.response));
      else dispatch(putEditProfFailure(error.message));
    }
  };
};

export const createNewArticle = (articleData) => {
  return async (dispatch) => {
    try {
      dispatch(postNewArticles());
      const res = await postNewArticle(articleData);
      const { article } = res.data;
      dispatch(postNewArticlesSuccess(article));
    } catch (error) {
      if (error.message === '422') dispatch(postNewArticlesServerFailure(error));
      else dispatch(postNewArticlesFailure(error.message));
    }
  };
};

export const editArticle = (articleData, slug) => {
  return async (dispatch) => {
    try {
      dispatch(putEditArticles());
      const res = await putEditArticle(articleData, slug);
      console.log(res);
      dispatch(putEditArticlesSuccess());
    } catch (error) {
      if (error.message === '422') dispatch(putEditArticlesServerFailure(error));
      else dispatch(putEditArticlesFailure(error.message));
    }
  };
};

export const getEditArticle = (slug) => {
  console.log(slug);
  return async (dispatch) => {
    try {
      dispatch(fetchEditArticlesRequest());
      const res = await getArticleEdit(slug);
      const { article } = res.data;
      dispatch(fetchEditArticlesSuccess(article));
    } catch (error) {
      dispatch(fetchEditArticlesFailure(error.message));
    }
  };
};

export const delArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(deleteArticles());
      const res = await deleteArticle(slug);
      if (res.status === 204) dispatch(deleteArticlesSuccess());
    } catch (error) {
      if (error.message === '422') dispatch(deleteArticlesServerFailure(error));
      else dispatch(deleteArticlesFailure(error.message));
    }
  };
};

export const postLike = (slug) => {
  return async (dispatch) => {
    try {
      const res = await postFavorite(slug);
      const { article } = res.data;
      dispatch(postFavorited(article));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteLike = (slug) => {
  return async (dispatch) => {
    try {
      const res = await deleteFavorite(slug);
      const { article } = res.data;
      dispatch(deleteFavorited(article));
    } catch (error) {
      if (error.message === '422') console.log('422', error);
      else console.log('Another er', error);
    }
  };
};
