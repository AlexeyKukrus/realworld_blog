import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { editProfile } from '../../redux/actions/action-creators';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './profile.module.scss';

const Profile = () => {
  const reducerUsers = useSelector((state) => state.reducerUsers);
  const { user, loading, error, server, flag } = reducerUsers;
  const { username, email, image } = user;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: username,
      email: email,
      image: image,
    },
  });

  const onSubmit = (userData) => {
    const { username, email, password, avatar_image } = userData;
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
        image: avatar_image,
      },
    };
    dispatch(editProfile(user));
  };

  useEffect(() => {
    if (!error) {
      reset();
    }
  }, [loading, error]);

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <div className={classes.profile}>
        <h1 className={classes.profile__title}>Edit Profile</h1>
        <form className={classes.profile__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.profile__form_label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={classNames(classes.profile__form_input, { [classes.error__input]: errors.username })}
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
            {flag ? <p className={classes.error__message}>{server.data.errors.username}</p> : null}
            {errors?.username && <p className={classes.error__message}>{errors.username.message}</p>}
          </div>

          <label className={classes.profile__form_label} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            className={classNames(classes.profile__form_input, { [classes.error__input]: errors.email })}
            placeholder="Email address"
            type="email"
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
          <div>{errors?.email && <p className={classes.error__message}>{errors.email.message}</p>}</div>

          <label className={classes.profile__form_label} htmlFor="password">
            New Password
          </label>
          <input
            id="password"
            className={classNames(classes.profile__form_input, { [classes.error__input]: errors.password })}
            placeholder="Password"
            type="password"
            autoComplete="off"
            {...register('password', {
              required: 'Enter your password',
              minLength: { value: 6, message: 'Your password needs to be at 6 - 40 characters.' },
              maxLength: { value: 20, message: 'Your password needs to be at 6 - 40 characters.' },
            })}
          />
          <div>{errors?.password && <p className={classes.error__message}>{errors.password.message}</p>}</div>

          <label className={classes.profile__form_label} htmlFor="password">
            Avatar image (url)
          </label>
          <input
            id="avatar_image"
            className={classNames(classes.profile__form_input, { [classes.error__input]: errors.email })}
            placeholder="Avatar image"
            type="text"
            defaultValue={image}
            autoComplete="off"
            {...register('avatar_image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Incorrect URL',
              },
            })}
          />
          <div>{errors?.avatar_image && <p className={classes.error__message}>{errors.password.message}</p>}</div>

          <button className={classes.profile__form_button} type="submit" value="Save" disabled={loading ? true : false}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
