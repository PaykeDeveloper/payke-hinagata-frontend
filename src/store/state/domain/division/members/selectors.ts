import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';
import { divisionSelector } from '../divisions/selectors';

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
