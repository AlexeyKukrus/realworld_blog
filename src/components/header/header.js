import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import profilePic from '../../img/avatar.png';

import classes from './header.module.scss';

const Header = () => {
  const isLogin = true;
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
              John Doe
            </Link>
            <img src={profilePic} className={classNames(classes.header__user_image)} alt="avatar" />
          </div>
          <a className={classNames(classes.header__button, classes.header__button_logout)}>Log Out</a>
        </div>
      )}
    </header>
  );
};

export default Header;
