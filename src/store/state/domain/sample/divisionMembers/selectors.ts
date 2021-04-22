// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';

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

export const memberViewPermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.UpdateOwnAll('project').some((e) =>
      permissionNames?.includes(e)
    )
);
