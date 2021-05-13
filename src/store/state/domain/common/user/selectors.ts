import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';

export const myUserSelector = (state: StoreState) =>
  state.domain.common.user.entity;

export const userPermissionNamesSelector = createSelector(
  myUserSelector,
  (user) => user?.permissionNames
);
