// FIXME: SAMPLE CODE

import { RootState } from 'src/store/store';

export const bookCommentsSelector = (state: RootState) =>
  state.domain.sample.bookComments.entities;

export const bookCommentsStatusSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntities.status;

export const bookCommentsErrorSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntities.error;

export const bookCommentSelector = (state: RootState) =>
  state.domain.sample.bookComments.entity;

export const bookCommentStatusSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntity.status;

export const bookCommentErrorSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntity.error;
