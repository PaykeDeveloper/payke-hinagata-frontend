// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { PermissionType } from '../../common/permissions/types';
import { permissionNamesSelector } from '../../common/user/selectors';
import { divisionSelector } from '../divisions/selectors';
import { Division } from '../divisions/types';

export const divisionMembersSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.entities;

export const divisionMembersStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntities.status;

export const divisionMembersErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntities.error;

export const divisionMemberSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.entity;

export const divisionMemberStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntity.status;

export const divisionMemberErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntity.error;

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
