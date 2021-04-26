import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { PermissionType } from '../../common/permissions/types';
import { permissionNamesSelector } from '../../common/user/selectors';
import { divisionSelector } from '../divisions/selectors';
import { Division } from '../divisions/types';

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
  division: Division | undefined,
  permissionNames: string[] | undefined,
  targetPermissions: string[]
) =>
  targetPermissions.some((e) =>
    PermissionType.isOwn(e)
      ? division?.requestMemberId
        ? permissionNames?.includes(e)
        : false
      : permissionNames?.includes(e)
  );

export const memberViewPermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.UpdateOwnAll('member')
    )
);

export const memberDeletePermissionCheckSelector = createSelector(
  divisionSelector,
  permissionNamesSelector,
  (division, permissionNames) =>
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.DeleteOwnAll('member')
    )
);
