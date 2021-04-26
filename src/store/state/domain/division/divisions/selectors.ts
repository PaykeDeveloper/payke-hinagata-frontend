import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import {
  Division,
  DivisionAllPermission,
  DivisionOwnPermission,
} from './types';

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

export const divisionOwnAllPermissionCheck = (
  division: Division | undefined,
  allPermissions: DivisionAllPermission[],
  ownPermissions: DivisionOwnPermission[]
) =>
  [...ownPermissions, ...allPermissions].some((e) =>
    (ownPermissions as string[]).includes(e)
      ? division?.requestMemberId && division?.permissionNames?.includes(e)
      : division?.permissionNames?.includes(e)
  );

export const divisionUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  (division) =>
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateAll('project'),
      PermissionFactory.CreateOwn('project')
    )
);
