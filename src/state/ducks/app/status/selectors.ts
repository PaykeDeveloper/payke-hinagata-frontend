import { RootState } from 'src/state/store';

export const statusSelector = (state: RootState) => state.app.status.entity;

export const statusStatusSelector = (state: RootState) =>
  state.app.status.meta.fetchEntity.status;
