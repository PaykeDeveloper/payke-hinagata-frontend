// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { convertListToObject } from 'src/base/utils';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../permissions/factories';
import { myUserSelector, userPermissionNamesSelector } from '../user/selectors';
import { User } from '../user/types';

export const userPermission = new OwnPermissionFactory('user');

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

export const userIdMapSelector = createSelector(
  usersSelector,
  (users): Record<number, User> => convertListToObject(users, 'id')
);

export const usersViewPermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => userPermission.canView(permissionNames)
);

export const usersUpdatePermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => userPermission.canUpdate(permissionNames)
);

export const userUpdatePermissionCheckSelector = createSelector(
  myUserSelector,
  userSelector,
  userPermissionNamesSelector,
  (myUser, user, permissionNames) =>
    myUser && user?.id === myUser?.id
      ? userPermission.canUpdateOwn(permissionNames)
      : userPermission.canUpdateAll(permissionNames)
);

export const userDeletePermissionCheckSelector = createSelector(
  myUserSelector,
  userSelector,
  userPermissionNamesSelector,
  (myUser, user, permissionNames) =>
    myUser && user?.id === myUser?.id
      ? userPermission.canDeleteOwn(permissionNames)
      : userPermission.canDeleteAll(permissionNames)
);
