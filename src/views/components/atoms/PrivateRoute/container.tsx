import React, { FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteProps } from 'react-router-dom';
import { statusSelector } from 'src/store/state/app/status/selectors';
import { useStoreSelector } from 'src/store/store';
import Component from './component';

type Props = RouteProps;

const selector = createSelector([statusSelector], (status) => ({
  isAuthenticated: !!status?.isAuthenticated,
}));

const PrivateRoute: FC<Props> = (props) => {
  const state = useStoreSelector(selector);
  return <Component {...props} {...state} />;
};

export default PrivateRoute;
