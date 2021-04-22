import React, { ComponentProps, FC, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch } from 'src/store';
import { authActions } from 'src/store/state/app/auth/slice';
import { rootPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const { changePassword } = authActions;

const ChangePassword: FC<RouteComponentProps> = (props) => {
  const {
    history: { push },
  } = props;

  const dispatch = useStoreDispatch();
  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        changePassword({ pathParams: {}, bodyParams })
      );
      if (changePassword.fulfilled.match(action)) {
        push(rootPath);
      }
      return action;
    },
    [dispatch, push]
  );

  return <Component object={undefined} onSubmit={onSubmit} />;
};

export default ChangePassword;
