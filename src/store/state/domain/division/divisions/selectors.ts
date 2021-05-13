// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';

export const divisionPermission = new OwnPermissionFactory('division');

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

export const requestMemberIdSelector = createSelector(
  divisionSelector,
  (division) => division?.requestMemberId
);

export const memberPermissionNamesSelector = createSelector(
  divisionSelector,
  (division) => division?.permissionNames
);

export const divisionUpdatePermissionCheckSelector = createSelector(
  divisionSelector,
  memberPermissionNamesSelector,
  userPermissionNamesSelector,
  (division, memberPermissionNames, userPermissionNames) =>
    division?.requestMemberId !== null
      ? divisionPermission.canUpdateOwn(memberPermissionNames)
      : divisionPermission.canUpdateAll(userPermissionNames)
);

export const divisionsUpdatePermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => divisionPermission.canUpdate(permissionNames)
);

export const divisionsCreatePermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => divisionPermission.canCreate(permissionNames)
);
