// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const bookImportCsvsSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.entities;

export const bookImportCsvsStatusSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.meta.fetchEntities.status;

export const bookImportCsvsErrorSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.meta.fetchEntities.error;

export const bookImportCsvSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.entity;

export const bookImportCsvStatusSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.meta.fetchEntity.status;

export const bookImportCsvErrorSelector = (state: StoreState) =>
  state.domain.sample.bookImportCsvs.meta.fetchEntity.error;
