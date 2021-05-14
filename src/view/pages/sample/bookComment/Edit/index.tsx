// FIXME: SAMPLE CODE

import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject, objectToInputs } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  bookCommentErrorSelector,
  bookCommentSelector,
  bookCommentStatusSelector,
} from 'src/store/state/domain/sample/bookComments/selectors';
import { bookCommentsActions } from 'src/store/state/domain/sample/bookComments/slice';
import { bookSelector } from 'src/store/state/domain/sample/books/selectors';
import { booksActions } from 'src/store/state/domain/sample/books/slice';
import { BookCommentPath, getBookPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    bookSelector,
    bookCommentSelector,
    bookCommentStatusSelector,
    bookCommentErrorSelector,
  ],
  (book, bookComment, status, error) => ({
    book,
    bookComment,
    status,
    error,
  })
);

const rules = { approvedAt: 'dateTime' } as const;

const Container: FC<
  RouteComponentProps<BookCommentPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || getBookPath(pathParams);
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  useEffect(() => {
    const reset = true;
    dispatch(
      booksActions.fetchEntityIfNeeded({
        pathParams: { bookId: pathParams.bookId },
        reset,
      })
    );
    dispatch(bookCommentsActions.fetchEntityIfNeeded({ pathParams, reset }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (params) => {
      const action = await dispatch(
        bookCommentsActions.mergeEntity({
          pathParams,
          bodyParams: inputsToObject(params, rules),
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

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(
      bookCommentsActions.removeEntity({ pathParams })
    );
    if (bookCommentsActions.removeEntity.fulfilled.match(action)) {
      onBack();
    }
    return action;
  }, [dispatch, pathParams, onBack]);

  const { bookComment, ...otherState } = useStoreSelector(selector);
  const object = useMemo(
    () => bookComment && objectToInputs(bookComment, rules),
    [bookComment]
  );

  return (
    <Form
      {...otherState}
      title="Edit comment"
      object={object}
      bookComment={bookComment}
      onSubmit={onSubmit}
      onDelete={onDelete}
      onBack={onBack}
    />
  );
};

export default Container;
