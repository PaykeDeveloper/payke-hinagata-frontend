// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const booksSelector = (state: StoreState) =>
  state.domain.sample.books.entities;

export const booksStatusSelector = (state: StoreState) =>
  state.domain.sample.books.meta.fetchEntities.status;

export const booksErrorSelector = (state: StoreState) =>
  state.domain.sample.books.meta.fetchEntities.error;

export const bookSelector = (state: StoreState) =>
  state.domain.sample.books.entity;

export const bookStatusSelector = (state: StoreState) =>
  state.domain.sample.books.meta.fetchEntity.status;

export const bookErrorSelector = (state: StoreState) =>
  state.domain.sample.books.meta.fetchEntity.error;
