import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import {
  booksSelector,
  booksStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { bookNewPath, getBookPath } from 'src/views/routes/paths';
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
    location: { pathname, search },
  } = props;

  const dispatch = useStoreDispatch();
  useEffect(() => {
    dispatch(booksActions.fetchEntitiesIfNeeded({ pathParams: {} }));
  }, [dispatch]);
  const state = useStoreSelector(selector);

  const path = joinString(pathname, search);

  const onClickAdd = useCallback(
    () => push(bookNewPath, { path } as RouterLocationState),
    [push, path]
  );

  const onClickShow = useCallback(
    (bookId: number) =>
      push(getBookPath({ bookId: `${bookId}` }), {
        path,
      } as RouterLocationState),
    [push, path]
  );

  return (
    <Component {...state} onClickAdd={onClickAdd} onClickShow={onClickShow} />
  );
};

export default Container;
