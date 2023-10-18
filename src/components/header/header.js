import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';

import { currUser, logOut } from '../../redux/actions/action-creators';
import profilePic from '../../img/avatar.png';

import classes from './header.module.scss';

const Header = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.reducerUsers.isLogin);
  const currentUser = useSelector((state) => state.reducerUsers.user.username);
  const currentProfilePic = useSelector((state) => state.reducerUsers.user.image);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(currUser());
    }
  }, [dispatch, history, isLogin, currentUser, currentProfilePic]);

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__logo}>
        Realworld Blog
      </Link>
      {!isLogin ? (
        <div className={classNames(classes.header__buttons, classes.header__buttons_offline)}>
          <Link to="/sign-in" className={classNames(classes.header__button, classes.header__button_signin)}>
            Sign In
          </Link>
          <Link to="/sign-up" className={classNames(classes.header__button, classes.header__button_signup)}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={classNames(classes.header__buttons, classes.header__buttons_online)}>
          <Link to="/new-article" className={classNames(classes.header__button_create)}>
            Create article
          </Link>
          <div className={classNames(classes.header__user)}>
            <Link to="/profile" className={classNames(classes.header__user_name)}>
              {currentUser}
            </Link>
            <Link to="/profile" className={classNames(classes.header__user_image)}>
              <img src={!currentProfilePic ? profilePic : currentProfilePic} alt="avatar" />
            </Link>
          </div>
          <button
            className={classNames(classes.header__button, classes.header__button_logout)}
            onClick={() => {
              dispatch(logOut());
              history.push('/articles');
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
