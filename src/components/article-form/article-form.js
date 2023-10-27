import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import classNames from 'classnames';

import { createNewArticle, editArticle, getEditArticle } from '../../redux/actions/action-creators';
import Loader from '../loader/loader';
import Errors from '../errors/errors';

import classes from './article-form.module.scss';

const ArticleForm = () => {
  const article = useSelector((state) => state.reducerArticles.article);
  const loading = useSelector((state) => state.reducerArticles.loading);
  const error = useSelector((state) => state.reducerArticles.error);
  const created = useSelector((state) => state.reducerArticles.created);
  const edited = useSelector((state) => state.reducerArticles.edited);
  const { slug } = useParams();
  const { title, description, body, tagList } = article;

  const history = useHistory();
  const dispatch = useDispatch();
  const path = history.location.pathname;

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
    getValues,
    resetField,
    setValue,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tag: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  });

  const onSubmit = (articleData) => {
    const { title, description, body, tagList } = articleData;
    const editTagList = tagList.map((item) => item.tag);
    const article = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: editTagList,
      },
    };
    console.log(slug);
    if (path === '/new-article') dispatch(createNewArticle(article));
    else {
      dispatch(editArticle(article, slug));
    }
  };

  useEffect(() => {
    if (path === '/new-article') {
      if (path === '/new-article' && created) {
        history.push('/articles');
      }
      reset();
      remove(0);
    }
    if (path !== '/new-article') {
      if (path !== '/new-article' && edited) history.push('/articles');
      dispatch(getEditArticle(slug));
      setValue('title', title);
      setValue('description', description);
      setValue('body', body);
      remove(0);
      tagList.forEach((tag) => {
        append({ tag });
      });
    }
  }, [path, history, title, created, edited]);

  const addNewTag = () => {
    const newTagValue = getValues('newTag');
    if (newTagValue.trim() !== '') {
      append({ tag: newTagValue });
    }
    resetField('newTag');
  };

  return (
    <>
      {loading && !error ? <Loader /> : null}
      {error ? <Errors message={error} /> : null}
      <div className={classes.create}>
        {path === '/new-article' ? (
          <h1 className={classes.create__title}>Create new article</h1>
        ) : (
          <h1 className={classes.create__title}>Edit article</h1>
        )}
        <form className={classes.create__form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.create__form_label}>Title</label>
          <input
            id="title"
            className={classNames(classes.create__form_input, { [classes.error__input]: errors.title })}
            placeholder="Title"
            type="text"
            autoComplete="off"
            {...register('title', { required: 'Enter your title' })}
          />
          <div>{errors?.title && <p className={classes.error__message}>{errors.title.message}</p>}</div>

          <label className={classes.create__form_label}>Short description</label>
          <input
            id="description"
            className={classNames(classes.create__form_input, { [classes.error__input]: errors.title })}
            placeholder="Title"
            type="text"
            autoComplete="off"
            {...register('description', { required: 'Enter your description' })}
          />
          <div>{errors?.description && <p className={classes.error__message}>{errors.description.message}</p>}</div>

          <label className={classes.create__form_label}>Text</label>
          <textarea
            id="body"
            className={classNames(classes.create__form_input, classes.create__form_input_text, {
              [classes.error__input]: errors.title,
            })}
            placeholder="Text"
            type="textarea"
            autoComplete="off"
            {...register('body', { required: 'Enter your text' })}
          />
          <div>{errors?.body && <p className={classes.error__message}>{errors.body.message}</p>}</div>
          <ul className={classes.create__form_tags}>
            <label className={classes.create__form_label}>Tags</label>
            {fields.map((item, index) => {
              return (
                <li className={classes.create__list_tags_item} key={item.id}>
                  <input
                    className={classNames(classes.create__form_input, classes.create__form_input_tag)}
                    placeholder="Tag"
                    type="text"
                    defaultValue={item.tag}
                    autoFocus
                    {...register(`tagList.${index}.tag`, { required: true })}
                  />
                  <button className={classes.create__form_tags_delete} type="button" onClick={() => remove(index)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={classes.create__list_tags_item}>
            <input
              className={classNames(classes.create__form_input, classes.create__form_input_tag)}
              placeholder="Tag"
              type="text"
              {...register('newTag')}
            />
            <button className={classes.create__form_tags_delete} type="button" disabled={true}>
              Delete
            </button>
            <button className={classes.create__form_tags_add} type="button" onClick={() => addNewTag()}>
              Add tag
            </button>
          </div>
          <button className={classes.create__form_button} type="submit" disabled={loading ? true : false}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ArticleForm;
