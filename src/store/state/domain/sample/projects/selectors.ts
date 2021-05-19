// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { memberPermissionNamesSelector } from 'src/store/state/domain/division/divisions/selectors';
import { AllPermissionFactory } from 'src/store/utils';
import { userPermissionNamesSelector } from '../../common/user/selectors';

export const projectPermission = new AllPermissionFactory('project');

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

export const canViewProjectsSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    projectPermission.canViewAll(memberPermissionNames) ||
    projectPermission.canViewAll(userPermissionNames)
);

export const canCreateProjectSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    projectPermission.canCreateAll(memberPermissionNames) ||
    projectPermission.canCreateAll(userPermissionNames)
);

export const canUpdateProjectSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    projectPermission.canUpdateAll(memberPermissionNames) ||
    projectPermission.canUpdateAll(userPermissionNames)
);

export const canDeleteProjectSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    projectPermission.canDeleteAll(memberPermissionNames) ||
    projectPermission.canDeleteAll(userPermissionNames)
);

export const canEditProjectSelector = createSelector(
  canUpdateProjectSelector,
  canDeleteProjectSelector,
  (canUpdate, canDelete) => canUpdate || canDelete
);
