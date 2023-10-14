import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { getAnArticle } from '../../redux/actions/action-creators';
import { formatDate } from '../../utilities/utilities';

import classes from './article-item-full.module.scss';

const ArticleItemFull = () => {
  const isLogin = false;

  const article = useSelector((state) => state.reducerArticles.article);
  const { slug } = useParams();

  const { author, title, favoritesCount, tagList, description, createdAt, body } = article;
  const { username, image } = author;

  const markdown = body;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnArticle(slug));
  }, [dispatch]);

  return (
    <>
      <li className={classes.full}>
        <div className={classes.full__top}>
          <div className={classes.full__content}>
            <div className={classes.full__title}>
              <h5 className={classes.full__title_title}>{title}</h5>
              <label className={classes.full__label}>
                <button className={classes.full__label_like}></button>
                <p className={classes.full__label_count}>{favoritesCount}</p>
              </label>
            </div>
            <div className={classes.full__tags}>
              {tagList.map((item) => {
                return (
                  <p className={classes.full__tags_tag} key={title}>
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
            {!isLogin ? (
              <div className={classes.full__user_button}>
                <a className={classes.full__user_button_delete} href="#">
                  Delete
                </a>
                <Link to={`/articles/${slug}/edit`} className={classes.full__user_button_edit}>
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </li>
    </>
  );
};

export default ArticleItemFull;
