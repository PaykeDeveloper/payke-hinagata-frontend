// FIXME: SAMPLE CODE

import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject } from 'src/base/utils';
import {
  bookCommentsErrorSelector,
  bookCommentsStatusSelector,
} from 'src/store/state/domain/sample/bookComments/selectors';
import { bookCommentsActions } from 'src/store/state/domain/sample/bookComments/slice';
import { bookSelector } from 'src/store/state/domain/sample/books/selectors';
import { booksActions } from 'src/store/state/domain/sample/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/store/store';
import { BookPath, getBookPath } from 'src/views/routes/paths';
import { RouterState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookCommentsStatusSelector, bookCommentsErrorSelector],
  (book, status, error) => ({
    book,
    status,
    error,
  })
);

type Props = RouteComponentProps<BookPath, StaticContext, RouterState>;

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
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams, init: true }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    async (params) => {
      const action = await dispatch(
        bookCommentsActions.addEntity({
          pathParams,
          bodyParams: inputsToObject(params, { approvedAt: 'dateTime' }),
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
      bookComment={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default Container;
