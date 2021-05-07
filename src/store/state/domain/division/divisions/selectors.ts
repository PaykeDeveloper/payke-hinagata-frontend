import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import {
  PermissionFactory,
  AllPermissionFactory,
  OwnPermissionFactory,
} from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';
import {
  DivisionAllPermission,
  DivisionDetail,
  DivisionOwnPermission,
} from './types';

export const divisionOwnPermissionFactory: PermissionFactory<'division'> = new OwnPermissionFactory(
  'division'
);
export const divisionAllPermissionFactory: PermissionFactory<'division'> = new AllPermissionFactory(
  'division'
);

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
      ? divisionOwnPermissionFactory.canUpdate(division?.permissionNames)
      : divisionAllPermissionFactory.canUpdate(division?.permissionNames)
);

export const divisionsUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => divisionOwnPermissionFactory.canUpdate(permissionNames)
);

export const divisionsCreatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => divisionOwnPermissionFactory.canCreate(permissionNames)
);
