import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';
import { usersSelector } from '../../common/users/selectors';
import { divisionSelector } from '../divisions/selectors';
import { MemberUserDetail } from './types';

export const memberOwnPermission = new OwnPermissionFactory('member');

export const membersSelector = (state: StoreState) =>
  state.domain.division.members.entities;

export const membersStatusSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntities.status;

export const membersErrorSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntities.error;

export const memberSelector = (state: StoreState) =>
  state.domain.division.members.entity;

export const memberStatusSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntity.status;

export const memberErrorSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntity.error;

export const memberUsersSelector = createSelector(
  usersSelector,
  membersSelector,
  (users, members): MemberUserDetail[] =>
    members.map((member) => {
      const user = users.find((user) => user.id === member.userId);
      return {
        id: member.id,
        userId: member.userId,
        name: user?.name || null,
        memberCreatedAt: member.createdAt,
        memberUpdatedAt: member.updatedAt,
        userCreatedAt: user?.createdAt || null,
        userUpdatedAt: user?.updatedAt || null,
        roleNames: member.roleNames,
      };
    })
);

export const membersViewPermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => memberOwnPermission.canCreate(permissionNames)
);

export const memberCreatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermission.canCreateOwn(permissionNames)
      : memberOwnPermission.canCreateAll(permissionNames)
);

export const memberUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermission.canUpdateOwn(permissionNames)
      : memberOwnPermission.canUpdateAll(permissionNames)
);

export const memberDeletePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermission.canDeleteOwn(permissionNames)
      : memberOwnPermission.canDeleteAll(permissionNames)
);
