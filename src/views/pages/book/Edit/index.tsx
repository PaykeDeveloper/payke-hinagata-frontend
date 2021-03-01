import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import {
  bookSelector,
  bookStatusSelector,
} from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import { BookPath, booksPath } from 'src/views/routes/paths';
import { RouterLocationState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector(
  [bookSelector, bookStatusSelector],
  (object, status) => ({ object, status })
);

type Props = RouteComponentProps<BookPath, StaticContext, RouterLocationState>;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const search = location.state?.search;

  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(booksActions.fetchEntityIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        booksActions.mergeEntity({ pathParams, bodyParams })
      );
      if (booksActions.mergeEntity.fulfilled.match(action)) {
        push(joinString(booksPath, search));
      }
      return action;
    },
    [dispatch, pathParams, push, search]
  );

  const state = useReduxSelector(selector);

  const onDelete = useCallback(async () => {
    const action = await dispatch(booksActions.removeEntity({ pathParams }));
    if (booksActions.removeEntity.fulfilled.match(action)) {
      push(joinString(booksPath, search));
    }
    return action;
  }, [dispatch, pathParams, push, search]);

  return (
    <Form
      {...state}
      title="Edit book"
      onSubmit={onSubmit}
      onDelete={onDelete}
    />
  );
};

export default Container;
