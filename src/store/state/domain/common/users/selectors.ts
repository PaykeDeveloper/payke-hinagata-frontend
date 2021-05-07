// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import {
  MemberAllPermission,
  MemberOwnPermission,
} from '../../division/members/types';
import {
  PermissionFactory,
  AllPermissionFactory,
  OwnPermissionFactory,
} from '../permissions/factories';
import { myUserIdSelector, permissionNamesSelector } from '../user/selectors';
import { User } from '../user/types';

export const userOwnPermissionFactory: PermissionFactory<'user'> = new OwnPermissionFactory(
  'user'
);
export const userAllPermissionFactory: PermissionFactory<'user'> = new AllPermissionFactory(
  'user'
);

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
  (permissionNames) => userOwnPermissionFactory.canView(permissionNames)
);

export const usersUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => userAllPermissionFactory.canUpdate(permissionNames)
);

export const userUpdatePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    myUserId && user?.id === myUserId
      ? userOwnPermissionFactory.canUpdate(permissionNames)
      : userAllPermissionFactory.canUpdate(permissionNames)
);

export const userDeletePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    myUserId && user?.id === myUserId
      ? userOwnPermissionFactory.canDelete(permissionNames)
      : userAllPermissionFactory.canDelete(permissionNames)
);
