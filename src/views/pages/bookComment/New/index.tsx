import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { bookCommentsStatusSelector } from 'src/state/ducks/domain/bookComments/selectors';
import { bookCommentsActions } from 'src/state/ducks/domain/bookComments/slice';
import { bookSelector } from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { BookPath, getBookPath } from 'src/views/routes/paths';
import { RouterLocationState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookCommentsStatusSelector],
  (book, status) => ({
    book,
    status,
  })
);

type Props = RouteComponentProps<BookPath, StaticContext, RouterLocationState>;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || getBookPath(pathParams);
  const onBack = useCallback(() => push(backPath), [push, backPath]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        bookCommentsActions.addEntity({
          pathParams,
          bodyParams,
          useFormData: true,
        })
      );
      if (bookCommentsActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);

  return (
    <Form
      {...state}
      title="Add comment"
      object={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default Container;
