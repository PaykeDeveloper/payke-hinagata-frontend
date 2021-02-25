import React, { FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { authActions } from 'src/state/ducks/app/auth/slice';
import {
  statusSelector,
  statusStatusSelector,
} from 'src/state/ducks/app/status/selectors';
import { useReduxDispatch, useReduxSelector } from 'src/state/store';
import { rootPath } from 'src/views/routes/paths';
import Component, { LoginProps } from './component';

type Props = RouteComponentProps;

const selector = createSelector(
  [statusSelector, statusStatusSelector],
  (object, status) => ({
    isAuthenticated: !!object?.isAuthenticated,
    status,
  })
);

const { login } = authActions;

const Login: FC<Props> = (props) => {
  const {
    location: { search },
    history: { push, replace },
  } = props;
  const state = useReduxSelector(selector);

  const dispatch = useReduxDispatch();
  const onLoggedIn = useCallback(() => {
    const searchParams = new URLSearchParams(search);
    const next = searchParams.get('next');
    if (next) {
      return replace(next);
    }
    return push(rootPath);
  }, [push, replace, search]);

  const onSubmit: LoginProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(login({ pathParams: {}, bodyParams }));
      if (login.fulfilled.match(action)) {
        onLoggedIn();
      }
      return action;
    },
    [dispatch, onLoggedIn]
  );

  return (
    <Component
      {...state}
      object={undefined}
      onLoggedIn={onLoggedIn}
      onSubmit={onSubmit}
    />
  );
};

export default Login;
