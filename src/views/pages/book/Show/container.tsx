import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import {
  bookCommentsSelector,
  bookCommentsStatusSelector,
} from 'src/state/ducks/domain/bookComments/selectors';
import { bookCommentsActions } from 'src/state/ducks/domain/bookComments/slice';
import {
  bookSelector,
  bookStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import { BookPath, getBookEditPath } from 'src/views/routes/paths';
import Component from './component';

type Props = RouteComponentProps<BookPath>;

const selector = createSelector(
  [
    bookSelector,
    bookStatusSelector,
    bookCommentsSelector,
    bookCommentsStatusSelector,
  ],
  (book, bookStatus, bookComments, bookCommentsStatus) => ({
    book,
    bookStatus,
    bookComments,
    bookCommentsStatus,
  })
);

const Container: FC<Props> = (props) => {
  const {
    history: { push },
    match: { params: pathParams },
  } = props;

  const dispatch = useReduxDispatch();
  useEffect(() => {
    dispatch(bookCommentsActions.fetchEntitiesIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const state = useReduxSelector(selector);

  const onClickEditBook = useCallback(() => push(getBookEditPath(pathParams)), [
    push,
    pathParams,
  ]);

  const bookId = state.book?.id;
  const onClickAddBookComment = useCallback(
    () => push(getBookEditPath({ bookId: `${bookId}` })),
    [push, bookId]
  );

  const onClickEditBookComment = useCallback(() => {}, []);

  return (
    <Component
      {...state}
      onClickEditBook={onClickEditBook}
      onClickAddBookComment={onClickAddBookComment}
      onClickEditBookComment={onClickEditBookComment}
    />
  );
};

export default Container;
