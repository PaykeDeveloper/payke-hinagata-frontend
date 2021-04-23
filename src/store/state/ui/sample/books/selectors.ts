// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const bookImportersSelector = (state: StoreState) =>
  state.ui.sample.bookImporters.importers;

export const bookImporterResultsSelector = (state: StoreState) =>
  state.ui.sample.bookImporters.importResults;
