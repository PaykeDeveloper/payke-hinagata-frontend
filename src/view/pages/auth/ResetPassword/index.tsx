import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import { loginPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const { resetPassword } = authActions;

const ResetPassword: FC<RouteComponentProps> = (props) => {
  const {
    location,
    history: { push },
  } = props;
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || undefined;

  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (input) => {
      const action = await dispatch(
        resetPassword({ pathParams: {}, bodyParams: { ...input, token } })
      );
      if (resetPassword.fulfilled.match(action)) {
        enqueueSnackbar(action.payload.message, { variant: 'success' });
        push(loginPath);
      }
      return action;
    },
    [dispatch, push, token, enqueueSnackbar]
  );

  return <Component {...state} object={undefined} onSubmit={onSubmit} />;
};

export default ResetPassword;
