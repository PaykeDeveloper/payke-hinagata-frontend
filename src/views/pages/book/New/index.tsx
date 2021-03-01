import React, { FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { booksStatusSelector } from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
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
  const search = location.state?.search;

  const dispatch = useReduxDispatch();

  const onSubmit = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        booksActions.addEntity({ pathParams, bodyParams })
      );
      if (booksActions.addEntity.fulfilled.match(action)) {
        push(joinString(booksPath, search));
      }
      return action;
    },
    [dispatch, pathParams, push, search]
  );

  const state = useReduxSelector(selector);

  return <Form {...state} title="Add book" onSubmit={onSubmit} />;
};

export default Container;
