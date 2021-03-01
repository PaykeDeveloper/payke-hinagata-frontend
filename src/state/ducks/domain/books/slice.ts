import { Book } from 'src/state/types/domain';
import { BookUrl, getBookApiUrl, getBooksApiUrl } from 'src/state/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/state/utils';

const booksSlice = createEntitiesSlice<Book, {}, Book, BookUrl>(
  'books',
  getEntitiesInitialState(),
  getBooksApiUrl,
  getBookApiUrl,
  (state) => state.domain.books
);

export const booksActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;