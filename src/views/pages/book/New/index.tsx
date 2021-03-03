import React, { FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { booksStatusSelector } from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/state/store';
import { booksPath } from 'src/views/routes/paths';
import { RouterLocationState } from 'src/views/routes/types';
import Form from '../components/Form';

const selector = createSelector([booksStatusSelector], (status) => ({
  status,
}));

type Props = RouteComponentProps<{}, StaticContext, RouterLocationState>;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || booksPath;

  const onBack = useCallback(() => push(backPath), [push, backPath]);

  const dispatch = useStoreDispatch();

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        booksActions.addEntity({ pathParams, bodyParams, useFormData: true })
      );
      if (booksActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const state = useStoreSelector(selector);

  return (
    <Form {...state} title="Add book" onSubmit={onSubmit} onBack={onBack} />
  );
};

export default Container;
