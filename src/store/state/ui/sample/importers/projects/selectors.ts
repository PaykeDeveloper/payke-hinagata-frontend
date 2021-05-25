// FIXME: SAMPLE CODE

import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { ImportResult, ProjectImporter, ImportStatus } from './types';

export const importRowsSelector = (state: StoreState) =>
  state.ui.sample.importers.projects.importRows;

export const importerResultsSelector = (state: StoreState) =>
  state.ui.sample.importers.projects.meta.results;

export const finishedRowsSelector = (state: StoreState) =>
  state.ui.sample.importers.projects.meta.finished;

export const totalRowsSelector = (state: StoreState) =>
  state.ui.sample.importers.projects.meta.total;

export const importerStatusSelector = (state: StoreState) =>
  state.ui.sample.importers.projects.meta.status;

export const importResultSelector = createSelector(
  importerResultsSelector,
  (_: StoreState, id: string) => id,
  (results, id) => results[id]
);

export const filterImporters = (
  importers: ProjectImporter[],
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
