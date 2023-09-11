import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';

export const myUserSelector = (state: StoreState) =>
  state.domain.common.user.entity;

export const myUserStatusSelector = (state: StoreState) =>
  state.domain.common.user.meta.fetchEntity.status;

export const myUserErrorSelector = (state: StoreState) =>
  state.domain.common.user.meta.fetchEntity.error;

export const userPermissionNamesSelector = createSelector(
  myUserSelector,
  (user) => user?.permissionNames,
);
