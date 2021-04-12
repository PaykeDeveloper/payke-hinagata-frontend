import React, { ComponentProps, FC, useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
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
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: ChildProps['onSubmit'] = useCallback(async () => {
    const action = await dispatch(verifyEmail({ pathParams, searchParams }));
    push(rootPath);
    return action;
  }, [dispatch, push, pathParams, searchParams, enqueueSnackbar]);

  return <Component onSubmit={onSubmit} />;
};

export default VerifyEmail;
