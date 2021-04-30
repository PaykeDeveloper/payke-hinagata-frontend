// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { ImportResults, BookImporter, ImportStatus } from './types';

export const bookImportersSelector = (state: StoreState) =>
  state.ui.sample.bookImporters.importers;

export const bookImporterResultsSelector = (state: StoreState) =>
  state.ui.sample.bookImporters.importResults;

export const bookImporterFinishedSelecotr = (state: StoreState) =>
  state.ui.sample.bookImporters.meta.finished;

export const bookImporterTotalSelecotr = (state: StoreState) =>
  state.ui.sample.bookImporters.meta.total;

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
