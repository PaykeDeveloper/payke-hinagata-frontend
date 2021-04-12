import React, { ComponentProps, FC, useCallback, useMemo } from 'react';
import { IconButton } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { CloseIcon } from 'src/view/base/material-ui/Icon';
import { rootPath, VerifyEmailPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const { verifyEmail } = authActions;

const VerifyEmail: FC<RouteComponentProps<VerifyEmailPath>> = (props) => {
  const {
    match: { params: pathParams },
    location,
    history: { push },
  } = props;
  const urlSearchParams = new URLSearchParams(location.search);
  const expires = urlSearchParams.get('expires') || undefined;
  const signature = urlSearchParams.get('signature') || undefined;
  const searchParams = useMemo(() => ({ expires, signature }), [
    expires,
    signature,
  ]);

  const dispatch = useStoreDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit: ChildProps['onSubmit'] = useCallback(async () => {
    const action = await dispatch(verifyEmail({ pathParams, searchParams }));
    if (verifyEmail.fulfilled.match(action)) {
      enqueueSnackbar(t('Your email is verified.'), {
        variant: 'success',
        persist: true,
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
      push(rootPath);
    } else {
      enqueueSnackbar(t('Your email is not verified!'), {
        variant: 'error',
        persist: true,
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    }
    return action;
  }, [
    dispatch,
    push,
    pathParams,
    searchParams,
    t,
    enqueueSnackbar,
    closeSnackbar,
  ]);

  return <Component onSubmit={onSubmit} />;
};

export default VerifyEmail;
