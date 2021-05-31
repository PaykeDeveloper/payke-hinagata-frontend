// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';

export const uploadProjectRowsSelector = (state: StoreState) =>
  state.ui.upload.sample.projects.rows;

export const uploadProjectMetasSelector = (state: StoreState) =>
  state.ui.upload.sample.projects.metas;

export const uploadProjectMetaSelector = createSelector(
  uploadProjectMetasSelector,
  (_: StoreState, { id }: { id: string }) => id,
  (metas, id) => metas[id]
);
