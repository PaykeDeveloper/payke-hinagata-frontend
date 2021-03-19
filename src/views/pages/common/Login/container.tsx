import React, { ComponentProps, FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import {
  statusSelector,
  statusStatusSelector,
} from 'src/store/state/app/status/selectors';
import { rootPath } from 'src/views/routes/paths';
import Component from './component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [statusSelector, statusStatusSelector],
  (object, status) => ({
    isAuthenticated: !!object?.isAuthenticated,
    status,
  })
);

const { login } = authActions;

const Login: FC<RouteComponentProps> = (props) => {
  const {
    location: { search },
    history: { push, replace },
  } = props;
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onLoggedIn: ChildProps['onLoggedIn'] = useCallback(() => {
    const searchParams = new URLSearchParams(search);
    const next = searchParams.get('next');
    if (next) {
      return replace(next);
    }
    return push(rootPath);
  }, [push, replace, search]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
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
