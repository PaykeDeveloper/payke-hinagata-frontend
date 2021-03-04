import { RootState } from 'src/state/store';

export const bookCommentsSelector = (state: RootState) =>
  state.domain.bookComments.entities;

export const bookCommentsStatusSelector = (state: RootState) =>
  state.domain.bookComments.meta.fetchEntities.status;

export const bookCommentSelector = (state: RootState) =>
  state.domain.bookComments.entity;

export const bookCommentStatusSelector = (state: RootState) =>
  state.domain.bookComments.meta.fetchEntity.status;
