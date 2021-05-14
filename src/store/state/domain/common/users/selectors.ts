// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { convertListToObject } from 'src/base/utils';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from 'src/store/utils';
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

export const userIdMapSelector = createSelector(usersSelector, (users) =>
  convertListToObject<number, User>(users, 'id')
);

export const checkUpdateUserSelector = createSelector(
  myUserSelector,
  userPermissionNamesSelector,
  (user, permissionNames) => (userId: number | undefined) => {
    if (
      userId &&
      userId === user?.id &&
      userPermission.canUpdateOwn(permissionNames)
    ) {
      return true;
    }
    return userPermission.canUpdateAll(permissionNames);
  }
);

export const checkDeleteUserSelector = createSelector(
  myUserSelector,
  userPermissionNamesSelector,
  (user, permissionNames) => (userId: number | undefined) => {
    if (
      userId &&
      userId === user?.id &&
      userPermission.canDeleteOwn(permissionNames)
    ) {
      return true;
    }
    return userPermission.canDeleteAll(permissionNames);
  }
);

export const checkEditUserSelector = createSelector(
  checkUpdateUserSelector,
  checkDeleteUserSelector,
  (checkUpdate, checkDelete) => (userId: number | undefined) =>
    checkUpdate(userId) || checkDelete(userId)
);
