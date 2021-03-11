import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
  bookSelector,
  bookStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { BookPath, booksPath } from 'src/views/routes/paths';
import { BaseRouterState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookStatusSelector],
  (object, status) => ({ object, status })
);

export type BookEditRouterState =
  | (BaseRouterState & {
      fromShow: boolean;
    })
  | undefined;

type Props = RouteComponentProps<BookPath, StaticContext, BookEditRouterState>;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || booksPath;
  const onBack = useCallback(() => push(backPath), [push, backPath]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        booksActions.mergeEntity({ pathParams, bodyParams })
      );
      if (booksActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);

  const fromShow = location.state?.fromShow;
  const onDelete = useCallback(async () => {
    const action = await dispatch(booksActions.removeEntity({ pathParams }));
    if (booksActions.removeEntity.fulfilled.match(action)) {
      if (fromShow) {
        push(booksPath);
      } else {
        onBack();
      }
    }
    return action;
  }, [dispatch, pathParams, onBack, push, fromShow]);

  return (
    <Form
      {...state}
      title="Edit book"
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Container;
