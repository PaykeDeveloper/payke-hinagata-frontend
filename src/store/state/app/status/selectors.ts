import { StoreState } from 'src/store';

export const statusSelector = (state: StoreState) => state.app.status.entity;

export const statusStatusSelector = (state: StoreState) =>
  state.app.status.meta.fetchEntity.status;
