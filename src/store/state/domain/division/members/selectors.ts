import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import {
  PermissionFactory,
  AllPermissionFactory,
  OwnPermissionFactory,
} from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';
import { usersSelector } from '../../common/users/selectors';
import { divisionSelector } from '../divisions/selectors';
import { DivisionDetail } from '../divisions/types';
import {
  MemberAllPermission,
  MemberOwnPermission,
  MemberUserDetail,
} from './types';

export const memberOwnPermissionFactory: PermissionFactory<'member'> = new OwnPermissionFactory(
  'member'
);
export const memberAllPermissionFactory: PermissionFactory<'member'> = new AllPermissionFactory(
  'member'
);

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
  (permissionNames) => memberOwnPermissionFactory.canCreate(permissionNames)
);

export const memberCreatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermissionFactory.canCreate(permissionNames)
      : memberAllPermissionFactory.canCreate(permissionNames)
);

export const memberUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermissionFactory.canUpdate(permissionNames)
      : memberAllPermissionFactory.canUpdate(permissionNames)
);

export const memberDeletePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    division?.requestMemberId !== null
      ? memberOwnPermissionFactory.canDelete(permissionNames)
      : memberAllPermissionFactory.canDelete(permissionNames)
);
