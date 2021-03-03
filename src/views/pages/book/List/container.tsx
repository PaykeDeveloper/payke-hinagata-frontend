import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import {
  booksSelector,
  booksStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { booksNewPath, getBookEditPath } from 'src/views/routes/paths';
import { RouterLocationState } from 'src/views/routes/types';
import Component from './component';

type Props = RouteComponentProps;

const selector = createSelector(
  [booksSelector, booksStatusSelector],
  (books, status) => ({ books, status })
);

const Container: FC<Props> = (props) => {
  const {
    history: { push },
    location: { search },
  } = props;
  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(booksActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useStoreSelector(selector);

  const onClickAdd = useCallback(
    () => push(booksNewPath, { search } as RouterLocationState),
    [push, search]
  );

  const onClickLink = useCallback(
    (bookId: number) =>
      push(getBookEditPath({ bookId: `${bookId}` }), {
        search,
      } as RouterLocationState),
    [push, search]
  );

  return (
    <Component {...state} onClickAdd={onClickAdd} onClickLink={onClickLink} />
  );
};

export default Container;
