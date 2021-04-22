import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { RoleType } from './types';

export const rolesSelector = (state: StoreState) =>
  state.domain.common.roles.entities;

export const rolesStatusSelector = (state: StoreState) =>
  state.domain.common.roles.meta.fetchEntities.status;

export const rolesErrorSelector = (state: StoreState) =>
  state.domain.common.roles.meta.fetchEntities.error;

export const roleSelector = (state: StoreState) =>
  state.domain.common.roles.entity;

export const roleStatusSelector = (state: StoreState) =>
  state.domain.common.roles.meta.fetchEntity.status;

export const roleErrorSelector = (state: StoreState) =>
  state.domain.common.roles.meta.fetchEntity.error;

export const userRolesSelector = createSelector(rolesSelector, (roles) =>
  roles.filter((role) => role.type === RoleType.User)
);

export const memberRolesSelector = createSelector(rolesSelector, (roles) =>
  roles.filter((role) => role.type === RoleType.Member)
);
