import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import {
  booksSelector,
  booksStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import { booksNewPath } from 'src/views/routes/paths';
import Component from './component';

type Props = RouteComponentProps;

const selector = createSelector(
  [booksSelector, booksStatusSelector],
  (books, status) => ({ books, status })
);

const Container: FC<Props> = (props) => {
  const {
    history: { push },
  } = props;
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(booksActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useReduxSelector(selector);

  const onClickAdd = useCallback(() => push(booksNewPath), [push]);

  return <Component {...state} onClickAdd={onClickAdd} />;
};

export default Container;
