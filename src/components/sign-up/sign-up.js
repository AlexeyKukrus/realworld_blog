import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { registerUser } from '../../redux/actions/action-creators';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './sign-up.module.scss';

const SignUp = () => {
  const reducerUsers = useSelector((state) => state.reducerUsers);
  const { loading, error, user, server } = reducerUsers;
  const { token } = user;

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({ mode: 'onSubmit' });

  const password = watch('password', '');

  const onSubmit = (userData) => {
    const { username, email, password } = userData;
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    };
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (token) {
      history.push('/sign-in');
      reset();
    }
  }, [token, server, reset]);

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <div className={classes.signup}>
        <h1 className={classes.signup__title}>Create new account</h1>
        <form className={classes.signup__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.signup__form_label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={classNames(classes.signup__form_input, { [classes.error__input]: errors.username })}
            placeholder="Username"
            type="text"
            autoComplete="off"
            {...register('username', {
              required: 'Enter your name',
              minLength: { value: 3, message: 'Your name needs to be at 3 - 20 characters.' },
              maxLength: { value: 20, message: 'Your name needs to be at 3 - 20 characters.' },
            })}
          />
          <div>
            {errors?.username && <p className={classes.error__message}>{errors.username.message}</p>}
            {server.errors.username ? <p className={classes.error__message}>{server.errors.username}</p> : null}
          </div>
          <label className={classes.signup__form_label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className={classNames(classes.signup__form_input, { [classes.error__input]: errors.email })}
            placeholder="Email address"
            type="text"
            autoComplete="off"
            {...register('email', {
              required: 'Enter your email',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Please enter valid email',
              },
            })}
          />
          <div>
            {errors?.email && <p className={classes.error__message}>{errors.email.message}</p>}
            {server.errors.email ? <p className={classes.error__message}>{server.errors.email}</p> : null}
          </div>
          <label className={classes.signup__form_label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={classNames(classes.signup__form_input, { [classes.error__input]: errors.password })}
            placeholder="Password"
            type="text"
            autoComplete="off"
            {...register('password', {
              required: 'Enter your password',
              minLength: { value: 6, message: 'Your password needs to be at 6 - 40 characters.' },
              maxLength: { value: 20, message: 'Your password needs to be at 6 - 40 characters.' },
            })}
          />
          <div>{errors?.password && <p className={classes.error__message}>{errors.password.message}</p>}</div>

          <label className={classes.signup__form_label} htmlFor="repeat_password">
            Repeat Password
          </label>
          <input
            id="repeat_password"
            className={classNames(classes.signup__form_input, { [classes.error__input]: errors.repeat_password })}
            placeholder="Password"
            type="text"
            autoComplete="off"
            {...register('repeat_password', {
              required: 'Repeat your password',
              validate: (value) => value === password || 'Password mismatch',
            })}
          />
          <div>
            {errors?.repeat_password && <p className={classes.error__message}>{errors.repeat_password.message}</p>}
          </div>
          <div className={classes.signup__form_agreement}>
            <Checkbox
              className={classNames(classes.signup__form_agreement_checkbox, {
                [classes.error__input_checkbox]: errors.repeat_password,
              })}
              {...register('checkbox', {
                checked: false,
                onChange: (e) => {
                  setValue('checkbox', e.target.checked);
                },
                validate: (value) => value || '',
              })}
            />
            <span className={classes.signup__form_agreement_descr}>
              I agree to the processing of my personal information
            </span>
          </div>
          <button className={classes.signup__form_button} type="submit">
            Create
          </button>

          <p className={classes.signup__form_text}>
            {'Already have an account? '}
            <Link className={classes.signup__form_text_link} to="/sign-in">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
