// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../permissions/factories';
import { permissionNamesSelector } from '../user/selectors';

export const usersSelector = (state: StoreState) =>
  state.domain.common.users.entities;

export const usersStatusSelector = (state: StoreState) =>
  state.domain.common.users.meta.fetchEntities.status;

export const usersErrorSelector = (state: StoreState) =>
  state.domain.common.users.meta.fetchEntities.error;

export const userSelector = (state: StoreState) =>
  state.domain.common.users.entity;

export const userStatusSelector = (state: StoreState) =>
  state.domain.common.users.meta.fetchEntity.status;

export const userErrorSelector = (state: StoreState) =>
  state.domain.common.users.meta.fetchEntity.error;

export const usersViewPermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.ViewOwnAll('user').some((e) =>
      permissionNames?.includes(e)
    )
);
