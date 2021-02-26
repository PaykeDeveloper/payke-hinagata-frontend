import React, { FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { booksStatusSelector } from 'src/state/ducks/domain/books/selectors';
import { booksActions } from 'src/state/ducks/domain/books/slice';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import Form from '../components/Form';

const selector = createSelector([booksStatusSelector], (status) => ({
  status,
}));

type Props = RouteComponentProps;

const Container: FC<Props> = (props) => {
  const {
    match: { params: pathParams },
  } = props;

  const dispatch = useReduxDispatch();

  const onSubmit = useCallback(
    (bodyParams) =>
      dispatch(booksActions.addEntity({ pathParams, bodyParams })),
    [dispatch, pathParams]
  );

  const state = useReduxSelector(selector);

  return <Form {...state} title="Add book" onSubmit={onSubmit} />;
};

export default Container;
