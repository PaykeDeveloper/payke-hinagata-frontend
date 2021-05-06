// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { ImportResult, BookImporter, ImportStatus } from './types';

export const importRowsSelector = (state: StoreState) =>
  state.ui.sample.importers.books.importRows;

export const importerResultsSelector = (state: StoreState) =>
  state.ui.sample.importers.books.meta.results;

export const finishedRowsSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.finished;

export const totalRowsSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.total;

export const importerStatusSelecotr = (state: StoreState) =>
  state.ui.sample.importers.books.meta.status;

export const importResultSelector = createSelector(
  importerResultsSelector,
  (_: StoreState, id: string) => id,
  (results, id) => results[id]
);

export const filterImporters = (
  importers: BookImporter[],
  results: { [id: string]: ImportResult },
  status: ImportStatus
) => {
  const filterIds = Object.keys(results).filter(
    (key: string) => results[key]?.status === status
  );
  return importers.filter((importer) => filterIds.includes(importer.id));
};

export const filterErrorImporters = createSelector(
  importRowsSelector,
  importerResultsSelector,
  (importers, results) =>
    filterImporters(importers, results, ImportStatus.Failed)
);
