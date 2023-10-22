import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { formatDate } from '../../utilities/format-date';
import { formatTitle, formatDescription } from '../../utilities/format-text';
import { postLike, deleteLike } from '../../redux/actions/action-creators';

import classes from './articles-item.module.scss';

const ArticleItem = ({ item }) => {
  const { slug, title, description, tagList, createdAt, favoritesCount, author, favorited } = item;
  const { username, image } = author;
  const isLogin = useSelector((state) => state.reducerUsers.isLogin);

  const dispatch = useDispatch();

  const handleFavorite = () => {
    favorited ? dispatch(deleteLike(slug)) : dispatch(postLike(slug));
  };

  useEffect(() => {}, [slug, favorited, favoritesCount]);

  return (
    <li className={classes.article}>
      <div className={classes.article__content}>
        <div className={classes.article__title}>
          <Link to={`/articles/${slug}`} className={classes.article__title_title}>
            {formatTitle(title)}
          </Link>
          <label className={classes.article__label}>
            <button
              className={favorited ? classes.article__label_active : classes.article__label_like}
              disabled={!isLogin ? true : false}
              onClick={() => {
                handleFavorite();
              }}
            ></button>
            <p className={classes.article__label_count}>{favoritesCount}</p>
          </label>
        </div>
        <div className={classes.article__tags}>
          {tagList.map((item) => {
            return (
              <p className={classes.article__tags_tag} key={uuidv4()}>
                {item}
              </p>
            );
          })}
        </div>
        <p className={classes.article__descr}>{formatDescription(description)}</p>
      </div>
      <div className={classes.article__user}>
        <div className={classes.article__user_info}>
          <h6 className={classes.article__user_name}>{username}</h6>
          <p className={classes.article__user_date}>{formatDate(createdAt)}</p>
        </div>
        <img className={classes.article__user_img} src={image} alt="avatar" />
      </div>
    </li>
  );
};

export default ArticleItem;
