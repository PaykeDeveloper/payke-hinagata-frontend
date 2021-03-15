import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { authActions } from 'src/store/state/app/auth/slice';
import { useStoreDispatch } from 'src/store/store';
import { loginPath } from 'src/views/routes/paths';
import Component from './component';

const { logout, resetAll } = authActions;

const Container: FC = () => {
  const dispatch = useStoreDispatch();
  const { push } = useHistory();
  const onLogout = useCallback(async () => {
    const action = await dispatch(logout({ pathParams: {}, bodyParams: {} }));
    if (logout.fulfilled.match(action)) {
      push(loginPath);
      await dispatch(resetAll());
    }
    return action;
  }, [dispatch, push]);

  return <Component onLogout={onLogout} />;
};

export default Container;
