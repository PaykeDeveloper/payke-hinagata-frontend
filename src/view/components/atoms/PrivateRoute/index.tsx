import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { statusSelector } from 'src/store/state/app/status/selectors';
import { userActions } from 'src/store/state/domain/common/user/slice';
import Component from './Component';

type Props = RouteProps;
type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector([statusSelector], (status) => ({
  isAuthenticated: !!status?.isAuthenticated,
}));

const PrivateRoute: FC<Props> = (props) => {
  const state = useStoreSelector(selector);

  const dispatch = useStoreDispatch();
  const onMounted: ChildProps['onMounted'] = useCallback(() => {
    dispatch(userActions.fetchEntityIfNeeded({ pathParams: {} }));
  }, [dispatch]);

  return <Component {...props} {...state} onMounted={onMounted} />;
};

export default PrivateRoute;
