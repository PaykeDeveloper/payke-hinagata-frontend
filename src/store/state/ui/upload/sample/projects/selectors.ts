// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';

export const uploadProjectsSelector = (state: StoreState) =>
  state.ui.upload.sample.projects.rows;

export const uploadProjectMetasSelector = (state: StoreState) =>
  state.ui.upload.sample.projects.metas;

export const uploadProjectMetaSelector = createSelector(
  uploadProjectMetasSelector,
  (_: StoreState, index: number) => index,
  (metas, index) => metas[index]
);
