import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import {
  bookSelector,
  bookStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import { BookPath } from 'src/views/routes/paths';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookStatusSelector],
  (object, status) => ({ object, status })
);

type Props = RouteComponentProps<BookPath>;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
  } = props;

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    (bodyParams) =>
      dispatch(booksActions.mergeEntity({ pathParams, bodyParams })),
    [dispatch, pathParams]
  );

  const state = useReduxSelector(selector);

  return <Form {...state} title="Edit book" onSubmit={onSubmit} />;
};

export default Container;
