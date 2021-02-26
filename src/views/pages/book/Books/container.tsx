import React, { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import {
  booksSelector,
  booksStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import Component from './component';

const selector = createSelector(
  [booksSelector, booksStatusSelector],
  (books, status) => ({ books, status })
);

const Container: FC = () => {
  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(booksActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useReduxSelector(selector);

  return <Component {...state} />;
};

export default Container;
