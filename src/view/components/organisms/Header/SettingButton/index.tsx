import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { loginPath } from 'src/view/routes/paths';
import Component from './Component';

const { logout, resetAll } = authActions;

const SettingButton: FC = () => {
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

export default SettingButton;
