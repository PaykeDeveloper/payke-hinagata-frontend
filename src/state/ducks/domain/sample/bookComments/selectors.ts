import { RootState } from 'src/state/store';

export const bookCommentsSelector = (state: RootState) =>
  state.domain.sample.bookComments.entities;

export const bookCommentsStatusSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntities.status;

export const bookCommentSelector = (state: RootState) =>
  state.domain.sample.bookComments.entity;

export const bookCommentStatusSelector = (state: RootState) =>
  state.domain.sample.bookComments.meta.fetchEntity.status;
