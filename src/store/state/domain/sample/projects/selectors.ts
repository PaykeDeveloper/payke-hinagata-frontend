// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { OwnPermissionFactory } from '../../common/permissions/factories';
import { userPermissionNamesSelector } from '../../common/user/selectors';

export const projectPermission = new OwnPermissionFactory('project');

export const projectsSelector = (state: StoreState) =>
  state.domain.sample.projects.entities;

export const projectsStatusSelector = (state: StoreState) =>
  state.domain.sample.projects.meta.fetchEntities.status;

export const projectsErrorSelector = (state: StoreState) =>
  state.domain.sample.projects.meta.fetchEntities.error;

export const projectSelector = (state: StoreState) =>
  state.domain.sample.projects.entity;

export const projectStatusSelector = (state: StoreState) =>
  state.domain.sample.projects.meta.fetchEntity.status;

export const projectErrorSelector = (state: StoreState) =>
  state.domain.sample.projects.meta.fetchEntity.error;

export const projectCreatePermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => projectPermission.canCreate(permissionNames)
);

export const projectUpdatePermissionCheckSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => projectPermission.canUpdate(permissionNames)
);
