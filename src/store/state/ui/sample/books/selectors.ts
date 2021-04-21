// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const bookImportersSelector = (state: StoreState) =>
  state.ui.sample.bookImporters.importers;
