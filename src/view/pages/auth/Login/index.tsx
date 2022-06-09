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
      return replace(decodeURIComponent(next));
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
