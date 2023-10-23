import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import { Popconfirm } from 'antd';

import { getAnArticle, delArticle, postLike, deleteLike } from '../../redux/actions/action-creators';
import { formatDate } from '../../utilities/format-date';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './article-item-full.module.scss';

const ArticleItemFull = () => {
  const isLogin = useSelector((state) => state.reducerUsers.isLogin);
  const article = useSelector((state) => state.reducerArticles.article);
  const user = useSelector((state) => state.reducerUsers.user.username);
  const loading = useSelector((state) => state.reducerArticles.loading);
  const error = useSelector((state) => state.reducerArticles.error);

  const { slug } = useParams();

  const { author, title, favoritesCount, tagList, description, createdAt, body, favorited } = article;
  const { username, image } = author;

  const markdown = body;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirm = () => {
    dispatch(delArticle(slug));
    history.push('/articles');
  };
  const cancel = () => {
    console.log('cancel');
  };

  const handleFavorite = () => {
    favorited ? dispatch(deleteLike(slug)) : dispatch(postLike(slug));
  };

  useEffect(() => {
    dispatch(getAnArticle(slug));
  }, [dispatch, isLogin]);

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <li className={classes.full}>
        <div className={classes.full__top}>
          <div className={classes.full__content}>
            <div className={classes.full__title}>
              <h5 className={classes.full__title_title}>{title}</h5>
              <label className={classes.full__label}>
                <button
                  className={favorited ? classes.full__label_active : classes.full__label_like}
                  disabled={!isLogin ? true : false}
                  onClick={() => {
                    handleFavorite();
                  }}
                ></button>
                <p className={classes.full__label_count}>{favoritesCount}</p>
              </label>
            </div>
            <div className={classes.full__tags}>
              {tagList.map((item) => {
                return (
                  <p className={classes.full__tags_tag} key={uuidv4()}>
                    {item}
                  </p>
                );
              })}
            </div>
            <p className={classes.full__descr}>{description}</p>
          </div>
          <div className={classes.full__user}>
            <div className={classes.full__user_top}>
              <div className={classes.full__user_info}>
                <h6 className={classes.full__user_name}>{username}</h6>
                <p className={classes.full__user_date}>{formatDate(createdAt)}</p>
              </div>
              <img className={classes.full__user_img} src={image} alt="avatar" />
            </div>
            {isLogin && username === user ? (
              <div className={classes.full__user_button}>
                <Popconfirm
                  placement="rightTop"
                  description="Are you sure to delete this article?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a className={classes.full__user_button_delete} href="#">
                    Delete
                  </a>
                </Popconfirm>
                <Link to={`/articles/${slug}/edit`} className={classes.full__user_button_edit}>
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <ReactMarkdown className={classes.full__markdown}>{markdown}</ReactMarkdown>
      </li>
    </>
  );
};

export default ArticleItemFull;
