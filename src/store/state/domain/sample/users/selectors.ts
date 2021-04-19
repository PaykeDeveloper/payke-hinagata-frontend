// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const usersSelector = (state: StoreState) =>
  state.domain.sample.users.entities;

export const usersStatusSelector = (state: StoreState) =>
  state.domain.sample.users.meta.fetchEntities.status;

export const usersErrorSelector = (state: StoreState) =>
  state.domain.sample.users.meta.fetchEntities.error;

export const userSelector = (state: StoreState) =>
  state.domain.sample.users.entity;

export const userStatusSelector = (state: StoreState) =>
  state.domain.sample.users.meta.fetchEntity.status;

export const userErrorSelector = (state: StoreState) =>
  state.domain.sample.users.meta.fetchEntity.error;
