import React, { ComponentProps, FC, useCallback } from 'react';

import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const { forgotPassword } = authActions;

const ForgotPassword: FC<RouteComponentProps> = () => {
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        forgotPassword({ pathParams: {}, bodyParams })
      );
      if (forgotPassword.fulfilled.match(action)) {
        enqueueSnackbar(action.payload.message, { variant: 'success' });
      }
      return action;
    },
    [dispatch, enqueueSnackbar]
  );

  return <Component {...state} object={undefined} onSubmit={onSubmit} />;
};

export default ForgotPassword;
