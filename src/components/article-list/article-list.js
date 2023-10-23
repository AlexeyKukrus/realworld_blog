import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import { getArticles } from '../../redux/actions/action-creators';
import ArticleItem from '../article-item/article-item';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const reducerArticles = useSelector((state) => state.reducerArticles);

  const { articles, articlesCount, loading, error, deleted, edited } = reducerArticles;

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles(page));
  }, [dispatch, page, deleted, edited]);

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <ul className={classes.articles}>
        {articles.map((item) => {
          const { slug } = item;
          return <ArticleItem item={item} key={slug} />;
        })}
      </ul>
      <div className={classes.articles__pagination}>
        <Pagination
          defaultCurrent={1}
          total={articlesCount}
          onChange={(value) => setPage(value)}
          current={page}
          defaultPageSize={5}
          pageSize={5}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ArticleList;
