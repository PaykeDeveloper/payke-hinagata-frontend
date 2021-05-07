// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import {
  PermissionFactory,
  AllPermissionFactory,
  OwnPermissionFactory,
} from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';

export const projectOwnPermissionFactory: PermissionFactory<'project'> = new OwnPermissionFactory(
  'project'
);
export const projectAllPermissionFactory: PermissionFactory<'project'> = new AllPermissionFactory(
  'project'
);

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
  permissionNamesSelector,
  (permissionNames) => projectOwnPermissionFactory.canCreate(permissionNames)
);

export const projectUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) => projectOwnPermissionFactory.canUpdate(permissionNames)
);
