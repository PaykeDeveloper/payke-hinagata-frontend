import { Book, BookInput } from 'src/state/ducks/domain/books/types';
import { BookApiUrl, getBookApiUrl, getBooksApiUrl } from 'src/state/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/state/utils';

const booksSlice = createEntitiesSlice<Book, {}, Book, BookApiUrl, BookInput>(
  'books',
  getEntitiesInitialState(),
  getBooksApiUrl,
  getBookApiUrl,
  (state) => state.domain.books
);

export const booksActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
