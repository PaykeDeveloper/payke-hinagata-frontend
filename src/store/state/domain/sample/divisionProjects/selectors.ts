// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

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
