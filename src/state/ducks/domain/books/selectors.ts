import { RootState } from 'src/state/store';

export const booksSelector = (state: RootState) => state.domain.books.entities;

export const booksStatusSelector = (state: RootState) =>
  state.domain.books.meta.fetchEntities.status;
