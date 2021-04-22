// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { PermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';

export const divisionProjectsSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.entities;

export const divisionProjectsStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.meta.fetchEntities.status;

export const divisionProjectsErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.meta.fetchEntities.error;

export const divisionProjectSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.entity;

export const divisionProjectStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.meta.fetchEntity.status;

export const divisionProjectErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionProjects.meta.fetchEntity.error;

export const projectCreatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.CreateOwnAll('project').some((e) =>
      permissionNames?.includes(e)
    )
);

export const projectUpdatePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.UpdateOwnAll('project').some((e) =>
      permissionNames?.includes(e)
    )
);
