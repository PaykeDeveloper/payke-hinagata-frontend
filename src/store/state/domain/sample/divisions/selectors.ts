// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const divisionsSelector = (state: StoreState) =>
  state.domain.sample.divisions.entities;

export const divisionsStatusSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntities.status;

export const divisionsErrorSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntities.error;

export const divisionSelector = (state: StoreState) =>
  state.domain.sample.divisions.entity;

export const divisionStatusSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntity.status;

export const divisionErrorSelector = (state: StoreState) =>
  state.domain.sample.divisions.meta.fetchEntity.error;
