// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const divisionMembersSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.entities;

export const divisionMembersStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntities.status;

export const divisionMembersErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntities.error;

export const divisionSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.entity;

export const divisionStatusSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntity.status;

export const divisionErrorSelector = (state: StoreState) =>
  state.domain.sample.divisionMembers.meta.fetchEntity.error;
