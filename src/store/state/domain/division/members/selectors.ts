import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';
import { divisionSelector } from '../divisions/selectors';
import { DivisionDetail } from '../divisions/types';
import { MemberAllPermission, MemberOwnPermission } from './types';

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

export const memberOwnAllPermissionCheck = (
  division: DivisionDetail | undefined,
  permissionNames: string[] | undefined,
  allPermissions: MemberAllPermission[],
  ownPermissions: MemberOwnPermission[]
) =>
  [...ownPermissions, ...allPermissions].some((e) =>
    (ownPermissions as string[]).includes(e)
      ? division?.requestMemberId && permissionNames?.includes(e)
      : permissionNames?.includes(e)
  );

export const memberCreatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.CreateAll('member'),
      PermissionFactory.CreateOwn('member')
    )
);

export const memberUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.UpdateAll('member'),
      PermissionFactory.UpdateOwn('member')
    )
);

export const memberDeletePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.DeleteAll('member'),
      PermissionFactory.DeleteOwn('member')
    )
);
