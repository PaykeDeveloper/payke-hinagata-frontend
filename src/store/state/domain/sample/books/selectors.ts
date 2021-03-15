// FIXME: SAMPLE CODE

import { RootState } from 'src/store/store';

export const booksSelector = (state: RootState) =>
  state.domain.sample.books.entities;

export const booksStatusSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntities.status;

export const booksErrorSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntities.error;

export const bookSelector = (state: RootState) =>
  state.domain.sample.books.entity;

export const bookStatusSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntity.status;

export const bookErrorSelector = (state: RootState) =>
  state.domain.sample.books.meta.fetchEntity.error;
