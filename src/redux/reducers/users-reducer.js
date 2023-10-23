import { initialStateUsers } from '../initial-state';
import {
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
} from '../actions/action-types';

const reducerUsers = (state = initialStateUsers, action) => {
  switch (action.type) {
    case POST_REGISTRATION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      };
    case POST_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_REGISTRATION_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        server: action.payload,
      };
    case POST_LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      };
    case POST_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_LOGIN_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
        flag: true,
        server: { errors: { ...action.payload } },
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        user: {
          username: null,
          email: null,
          token: localStorage.removeItem('token'),
          image: null,
        },
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        isLogin: false,
        loading: false,
        error: null,
      };
    case PUT_EDIT_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
        flag: false,
      };
    case PUT_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        flag: false,
      };
    case PUT_EDIT_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PUT_EDIT_PROFILE_SERVER_FAILURE:
      return {
        ...state,
        loading: false,
        flag: true,
        server: action.payload,
      };
    default:
      return state;
  }
};

export default reducerUsers;
