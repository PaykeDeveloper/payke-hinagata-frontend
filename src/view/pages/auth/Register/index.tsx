import React, { ComponentProps, FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import { rootPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const { register } = authActions;

const Register: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
  } = props;
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (input) => {
      const name = input.email?.split('@')[0];
      const action = await dispatch(
        register({ pathParams: {}, bodyParams: { ...input, name } })
      );
      if (register.fulfilled.match(action)) {
        push(rootPath);
      }
      return action;
    },
    [dispatch, push]
  );

  return <Component {...state} object={undefined} onSubmit={onSubmit} />;
};

export default Register;
