// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import { OwnPermissionFactory } from 'src/store/utils';

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

export const canCreateDivisionSelector = createSelector(
  userPermissionNamesSelector,
  (userPermissionNames) => divisionPermission.canCreate(userPermissionNames)
);

export const checkUpdateDivisionSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    (requestMemberId: number | null | undefined) => {
      if (
        requestMemberId &&
        divisionPermission.canUpdateOwn(memberPermissionNames)
      ) {
        return true;
      }
      return divisionPermission.canUpdateAll(userPermissionNames);
    }
);

export const checkDeleteDivisionSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    (requestMemberId: number | null | undefined) => {
      if (
        requestMemberId &&
        divisionPermission.canDeleteOwn(memberPermissionNames)
      ) {
        return true;
      }
      return divisionPermission.canDeleteAll(userPermissionNames);
    }
);

export const checkEditDivisionSelector = createSelector(
  checkUpdateDivisionSelector,
  checkDeleteDivisionSelector,
  (checkUpdate, checkDelete) => (requestMemberId: number | null | undefined) =>
    checkUpdate(requestMemberId) || checkDelete(requestMemberId)
);
