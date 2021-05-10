// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../permissions/factories';
import { myUserIdSelector, permissionNamesSelector } from '../user/selectors';

export const userOwnPermission = new OwnPermissionFactory('user');

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
  (permissionNames) => userOwnPermission.canView(permissionNames)
);

export const usersUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => userOwnPermission.canUpdate(permissionNames)
);

export const userUpdatePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    myUserId && user?.id === myUserId
      ? userOwnPermission.canUpdateOwn(permissionNames)
      : userOwnPermission.canUpdateAll(permissionNames)
);

export const userDeletePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    myUserId && user?.id === myUserId
      ? userOwnPermission.canDeleteOwn(permissionNames)
      : userOwnPermission.canDeleteAll(permissionNames)
);
