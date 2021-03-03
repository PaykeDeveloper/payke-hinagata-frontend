import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
  bookCommentSelector,
  bookCommentStatusSelector,
} from 'src/state/ducks/domain/bookComments/selectors';
import { bookCommentsActions } from 'src/state/ducks/domain/bookComments/slice';
import { bookSelector } from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { BookCommentPath, getBookPath } from 'src/views/routes/paths';
import { RouterLocationState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookCommentSelector, bookCommentStatusSelector],
  (book, bookComment, status) => ({
    book,
    bookComment,
    status,
  })
);

type Props = RouteComponentProps<
  BookCommentPath,
  StaticContext,
  RouterLocationState
>;

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
    dispatch(bookCommentsActions.fetchEntityIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        bookCommentsActions.mergeEntity({
          pathParams,
          bodyParams,
          useFormData: true,
        })
      );
      if (bookCommentsActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const State = useStoreSelector(selector);

  return (
    <Form {...State} title="Edit comment" onSubmit={onSubmit} onBack={onBack} />
  );
};

export default Container;
