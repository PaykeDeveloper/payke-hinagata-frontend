import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';

export const divisionOwnPermission = new OwnPermissionFactory('division');

export const divisionsSelector = (state: StoreState) =>
  state.domain.division.divisions.entities;

export const divisionsStatusSelector = (state: StoreState) =>
  state.domain.division.divisions.meta.fetchEntities.status;

export const divisionsErrorSelector = (state: StoreState) =>
  state.domain.division.divisions.meta.fetchEntities.error;

export const divisionSelector = (state: StoreState) =>
  state.domain.division.divisions.entity;

export const divisionStatusSelector = (state: StoreState) =>
  state.domain.division.divisions.meta.fetchEntity.status;

export const divisionErrorSelector = (state: StoreState) =>
  state.domain.division.divisions.meta.fetchEntity.error;

export const divisionUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  (division) =>
    division?.requestMemberId !== null
      ? divisionOwnPermission.canUpdateOwn(division?.permissionNames)
      : divisionOwnPermission.canUpdateAll(division?.permissionNames)
);

export const divisionsUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => divisionOwnPermission.canUpdate(permissionNames)
);

export const divisionsCreatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => divisionOwnPermission.canCreate(permissionNames)
);
