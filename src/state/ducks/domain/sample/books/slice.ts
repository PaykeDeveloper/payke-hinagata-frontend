// FIXME: SAMPLE CODE

import { BookApiUrl, getBookApiUrl, getBooksApiUrl } from 'src/state/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/state/utils';
import { Book, BookInput } from './types';

const booksSlice = createEntitiesSlice<Book, {}, Book, BookApiUrl, BookInput>(
  'books',
  getEntitiesInitialState(),
  getBooksApiUrl,
  getBookApiUrl,
  (state) => state.domain.sample.books
);

export const booksActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
