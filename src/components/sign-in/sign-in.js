import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { loginUser } from '../../redux/actions/action-creators';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './sign-in.module.scss';

const SignIn = () => {
  const reducerUsers = useSelector((state) => state.reducerUsers);
  const { loading, error, isLogin, server } = reducerUsers;

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (userData) => {
    const { email, password } = userData;
    console.log(server);
    const user = {
      user: {
        email: email,
        password: password,
      },
    };
    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (isLogin) {
      reset();
      history.push('/articles');
    }
  }, [isLogin]);

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <div className={classes.signin}>
        <h1 className={classes.signin__title}>Sign In</h1>
        <form className={classes.signin__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.signin__form_label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className={classNames(classes.signin__form_input, { [classes.error__input]: errors.email })}
            placeholder="Email address"
            type="text"
            autoComplete="off"
            {...register('email', { required: 'Enter your email' })}
          />
          <div>{errors?.email && <p className={classes.error__message}>{errors.email.message}</p>}</div>

          <label className={classes.signin__form_label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={classNames(classes.signin__form_input, { [classes.error__input]: errors.password })}
            placeholder="Password"
            type="text"
            autoComplete="off"
            {...register('password', { required: 'Enter your password' })}
          />
          <div>{errors?.password && <p className={classes.error__message}>{errors.password.message}</p>}</div>
          <button className={classes.signin__form_button} type="submit">
            Login
          </button>
          <p className={classes.signin__form_text}>
            Don’t have an account?
            <Link className={classes.signin__form_text_link} to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
