// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { ImportResults, BookImporter, ImportStatus } from './types';

export const bookImportersSelector = (state: StoreState) =>
  state.ui.sample.importers.books.importers;

export const bookImporterResultsSelector = (state: StoreState) =>
  state.ui.sample.importers.books.importResults;

export const bookImporterFinishedSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.finished;

export const bookImporterTotalSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.total;

export const bookImporterStatusSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.status;

export const importResultSelector = createSelector(
  bookImporterResultsSelector,
  (_: StoreState, id: string) => id,
  (importResults, id) => importResults[id]
);

export const filterImporters = (
  importers: BookImporter[],
  importResults: { [id: string]: ImportResults },
  status: ImportStatus
) => {
  const filterIds = Object.keys(importResults).filter(
    (key: string) => importResults[key]?.status === status
  );
  return importers.filter((importer) => filterIds.includes(importer.id));
};

export const filterErrorImporters = createSelector(
  bookImportersSelector,
  bookImporterResultsSelector,
  (importers, results) =>
    filterImporters(importers, results, ImportStatus.Failed)
);
