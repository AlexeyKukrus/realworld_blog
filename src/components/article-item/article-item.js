import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utilities/utilities';

import classes from './articles-item.module.scss';

const ArticleItem = ({ item }) => {
  const { slug, title, description, tagList, createdAt, favoritesCount, author } = item;
  const { username, image } = author;

  useEffect(() => {}, [slug]);

  return (
    <li className={classes.article}>
      <div className={classes.article__content}>
        <div className={classes.article__title}>
          <Link to={`/articles/${slug}`} className={classes.article__title_title}>
            {title}
          </Link>
          <label className={classes.article__label}>
            <button className={classes.article__label_like}></button>
            <p className={classes.article__label_count}>{favoritesCount}</p>
          </label>
        </div>
        <div className={classes.article__tags}>
          {tagList.map((item) => {
            return (
              <p className={classes.article__tags_tag} key={item}>
                {item}
              </p>
            );
          })}
        </div>
        <p className={classes.article__descr}>{description}</p>
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
