// FIXME: SAMPLE CODE

import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import {
  bookCommentsErrorSelector,
  bookCommentsSelector,
  bookCommentsStatusSelector,
} from 'src/store/state/domain/sample/bookComments/selectors';
import { bookCommentsActions } from 'src/store/state/domain/sample/bookComments/slice';
import {
  bookErrorSelector,
  bookSelector,
  bookStatusSelector,
} from 'src/store/state/domain/sample/books/selectors';
import { booksActions } from 'src/store/state/domain/sample/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/store/store';
import { BookEditRouterState } from 'src/views/pages/sample/book/Edit';
import {
  BookPath,
  booksPath,
  getBookCommentEditPath,
  getBookCommentNewPath,
  getBookEditPath,
} from 'src/views/routes/paths';
import { RouterState } from 'src/views/routes/types';
import Component from './component';

type Props = RouteComponentProps<BookPath, StaticContext, RouterState>;

const selector = createSelector(
  [
    bookSelector,
    bookStatusSelector,
    bookErrorSelector,
    bookCommentsSelector,
    bookCommentsStatusSelector,
    bookCommentsErrorSelector,
  ],
  (
    book,
    bookStatus,
    bookError,
    bookComments,
    bookCommentsStatus,
    bookCommentsError
  ) => ({
    book,
    bookStatus,
    bookComments,
    bookCommentsStatus,
    errors: [bookError, bookCommentsError],
  })
);

const Container: FC<Props> = (props) => {
  const {
    history: { push },
    match: { params: pathParams },
    location,
  } = props;

  const backPath = location.state?.path || booksPath;
  const onBack = useCallback(() => push(backPath), [push, backPath]);

  const dispatch = useStoreDispatch();
  useEffect(() => {
    const init = true;
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams, init }));
    dispatch(bookCommentsActions.fetchEntitiesIfNeeded({ pathParams, init }));
  }, [dispatch, pathParams]);

  const path = joinString(location.pathname, location.search);

  const onClickEditBook = useCallback(
    () =>
      push(getBookEditPath(pathParams), {
        path,
        fromShow: true,
      } as BookEditRouterState),
    [push, pathParams, path]
  );

  const state = useStoreSelector(selector);

  const onClickAddBookComment = useCallback(
    () =>
      push(getBookCommentNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEditBookComment = useCallback(
    (commentId: string) =>
      push(getBookCommentEditPath({ ...pathParams, commentId }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  return (
    <Component
      {...state}
      onBack={onBack}
      onClickEditBook={onClickEditBook}
      onClickAddBookComment={onClickAddBookComment}
      onClickEditBookComment={onClickEditBookComment}
    />
  );
};

export default Container;
