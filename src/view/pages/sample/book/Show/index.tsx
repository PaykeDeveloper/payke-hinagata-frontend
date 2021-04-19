// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
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
import { BookEditRouterState } from 'src/view/pages/sample/book/Edit';
import {
  BookPath,
  booksPath,
  getBookCommentEditPath,
  getBookCommentNewPath,
  getBookEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

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

const Show: FC<RouteComponentProps<BookPath, StaticContext, RouterState>> = (
  props
) => {
  const {
    history: { push },
    match: { params: pathParams },
    location,
  } = props;

  const backPath = location.state?.path || booksPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();
  useEffect(() => {
    const reset = true;
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams, reset }));
    dispatch(bookCommentsActions.fetchEntitiesIfNeeded({ pathParams, reset }));
  }, [dispatch, pathParams]);

  const path = joinString(location.pathname, location.search);

  const onClickEditBook: ChildProps['onClickEditBook'] = useCallback(
    () =>
      push(getBookEditPath(pathParams), {
        path,
        fromShow: true,
      } as BookEditRouterState),
    [push, pathParams, path]
  );

  const state = useStoreSelector(selector);

  const onClickAddBookComment: ChildProps['onClickAddBookComment'] = useCallback(
    () =>
      push(getBookCommentNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEditBookComment: ChildProps['onClickEditBookComment'] = useCallback(
    (commentSlug) =>
      push(getBookCommentEditPath({ ...pathParams, commentSlug }), {
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

export default Show;
