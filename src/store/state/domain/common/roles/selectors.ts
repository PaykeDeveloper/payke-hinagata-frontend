import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { RoleType } from './types';

export const rolesSelector = (state: StoreState) =>
  state.domain.common.roles.entities;

export const rolesStatusSelector = (state: StoreState) =>
  state.domain.common.roles.meta.fetchEntities.status;

export const userRolesSelector = createSelector(rolesSelector, (roles) =>
  roles.filter((role) => role.type === RoleType.User)
);

export const memberRolesSelector = createSelector(rolesSelector, (roles) =>
  roles.filter((role) => role.type === RoleType.Member)
);
