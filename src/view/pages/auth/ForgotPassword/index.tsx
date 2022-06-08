import React, { ComponentProps, FC, useCallback } from 'react';

import { IconButton } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { statusStatusSelector } from 'src/store/state/app/status/selectors';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusStatusSelector], (status) => ({
  status,
}));

const { forgotPassword } = authActions;

const ForgotPassword: FC<RouteComponentProps> = () => {
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        forgotPassword({ pathParams: {}, bodyParams })
      );
      if (forgotPassword.fulfilled.match(action)) {
        enqueueSnackbar(action.payload.message, {
          variant: 'success',
          persist: true,
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          ),
        });
      }
      return action;
    },
    [dispatch, enqueueSnackbar, closeSnackbar]
  );

  return <Component {...state} object={undefined} onSubmit={onSubmit} />;
};

export default ForgotPassword;
