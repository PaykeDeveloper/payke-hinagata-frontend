// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import {
  MemberAllPermission,
  MemberOwnPermission,
} from '../../division/members/types';
import { PermissionFactory } from '../permissions/factories';
import { myUserIdSelector, permissionNamesSelector } from '../user/selectors';
import { User } from '../user/types';

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

export const usersUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.UpdateAll('user').some((e) =>
      permissionNames?.includes(e)
    )
);

export const userOwnAllPermissionCheck = (
  myUserId: number | undefined,
  user: User | undefined,
  permissionNames: string[] | undefined,
  allPermissions: MemberAllPermission[],
  ownPermissions: MemberOwnPermission[]
) =>
  [...ownPermissions, ...allPermissions].some((e) =>
    (ownPermissions as string[]).includes(e)
      ? myUserId && user?.id === myUserId && permissionNames?.includes(e)
      : permissionNames?.includes(e)
  );

export const userUpdatePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      PermissionFactory.UpdateAll('user'),
      PermissionFactory.UpdateOwn('user')
    )
);

export const userDeletePermissionCheckSelector = createSelector(
  myUserIdSelector,
  userSelector,
  permissionNamesSelector,
  (myUserId, user, permissionNames) =>
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      PermissionFactory.DeleteAll('user'),
      PermissionFactory.DeleteOwn('user')
    )
);
