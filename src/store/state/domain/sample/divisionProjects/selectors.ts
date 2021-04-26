// FIXME: SAMPLE CODE

import { StoreState } from 'src/store';

export const bookCommentsSelector = (state: StoreState) =>
  state.domain.sample.bookComments.entities;

export const bookCommentsStatusSelector = (state: StoreState) =>
  state.domain.sample.bookComments.meta.fetchEntities.status;

export const bookCommentsErrorSelector = (state: StoreState) =>
  state.domain.sample.bookComments.meta.fetchEntities.error;

export const bookCommentSelector = (state: StoreState) =>
  state.domain.sample.bookComments.entity;

export const bookCommentStatusSelector = (state: StoreState) =>
  state.domain.sample.bookComments.meta.fetchEntity.status;

export const bookCommentErrorSelector = (state: StoreState) =>
  state.domain.sample.bookComments.meta.fetchEntity.error;
