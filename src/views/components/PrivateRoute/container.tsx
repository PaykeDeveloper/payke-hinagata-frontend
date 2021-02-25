import React, { FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteProps } from 'react-router-dom';
import { statusSelector } from 'src/state/ducks/app/status/selectors';
import { useReduxSelector } from 'src/state/store';
import Component from './component';

type Props = RouteProps;

const selector = createSelector([statusSelector], (status) => ({
  isAuthenticated: !!status?.isAuthenticated,
}));

const PrivateRoute: FC<Props> = (props) => {
  const state = useReduxSelector(selector);
  return <Component {...props} {...state} />;
};

export default PrivateRoute;
