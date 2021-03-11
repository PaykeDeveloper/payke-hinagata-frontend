import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject, objectToInputs } from 'src/base/utils';
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

const rules = { approvedAt: 'dateTime' } as const;

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

  const onDelete = useCallback(async () => {
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
