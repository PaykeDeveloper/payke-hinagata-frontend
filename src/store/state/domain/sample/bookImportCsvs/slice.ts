// FIXME: SAMPLE CODE

import {
  BookImportCsvApiUrl,
  getBookImportCsvApiUrl,
  getBookImportCsvsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { BookImportCsv, BookImportCsvInput } from './types';

const bookImportCsvsSlice = createEntitiesSlice<
  BookImportCsv,
  {},
  BookImportCsv,
  BookImportCsvApiUrl,
  BookImportCsvInput
>(
  'bookImportCsvs',
  getEntitiesInitialState(),
  getBookImportCsvsApiUrl,
  getBookImportCsvApiUrl,
  (state) => state.domain.sample.bookImportCsvs
);

export const bookImportCsvsActions = bookImportCsvsSlice.actions;
export const bookImportCsvsReducer = bookImportCsvsSlice.reducer;
