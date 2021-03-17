// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
  booksErrorSelector,
  booksStatusSelector,
} from 'src/store/state/domain/sample/books/selectors';
import { booksActions } from 'src/store/state/domain/sample/books/slice';
import { useStoreDispatch, useStoreSelector } from 'src/store/store';
import { booksPath } from 'src/views/routes/paths';
import { RouterState } from 'src/views/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [booksStatusSelector, booksErrorSelector],
  (status, error) => ({
    status,
    error,
  })
);

const Container: FC<RouteComponentProps<{}, StaticContext, RouterState>> = (
  props
) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || booksPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        booksActions.addEntity({ pathParams, bodyParams })
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
    <Form
      {...state}
      title="Add book"
      object={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default Container;
