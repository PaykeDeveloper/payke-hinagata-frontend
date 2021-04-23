import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { PermissionType } from '../../common/permissions/types';
import { Division } from './types';

export const divisionsSelector = (state: StoreState) =>
  state.domain.sample.divisions.entities;

export const divisionsStatusSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntities.status;

export const divisionsErrorSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntities.error;

export const divisionSelector = (state: StoreState) =>
  state.domain.sample.divisions.entity;

export const divisionStatusSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntity.status;

export const divisionErrorSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntity.error;

export const divisionOwnAllPermissionCheck = (
  division: Division | undefined,
  selected: string[]
) =>
  selected.some((e) =>
    PermissionType.isOwn(e)
      ? division?.requestMemberId
        ? division?.permissionNames?.includes(e)
        : false
      : division?.permissionNames?.includes(e)
  );

export const divisionUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  (division) =>
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwnAll('project')
    )
);
