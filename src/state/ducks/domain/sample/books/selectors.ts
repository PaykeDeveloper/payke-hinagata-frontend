import { RootState } from 'src/state/store';

export const booksSelector = (state: RootState) =>
  state.domain.sample.books.entities;

export const booksStatusSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntities.status;

export const bookSelector = (state: RootState) =>
  state.domain.sample.books.entity;

export const bookStatusSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntity.status;
