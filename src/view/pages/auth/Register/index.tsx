import { ComponentProps, FC, useCallback } from 'react';
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
    location,
    history: { push },
  } = props;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || undefined;
  const token = searchParams.get('token') || undefined;

  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(register({ pathParams: {}, bodyParams }));
      if (register.fulfilled.match(action)) {
        push(rootPath);
      }
      return action;
    },
    [dispatch, push],
  );

  return <Component {...state} object={{ id, token }} onSubmit={onSubmit} />;
};

export default Register;
