// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  BookCommentApiUrl,
  BookApiUrl,
  getBookCommentApiUrl,
  getBookCommentsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { BookComment, BookCommentDetail, BookCommentInput } from './types';

const bookCommentsSlice = createEntitiesSlice<
  BookComment,
  BookApiUrl,
  BookCommentDetail,
  BookCommentApiUrl,
  BookCommentInput
>(
  'bookComments',
  getEntitiesInitialState(),
  getBookCommentsApiUrl,
  getBookCommentApiUrl,
  (state) => state.domain.sample.bookComments,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const bookCommentsActions = bookCommentsSlice.actions;
export const bookCommentsReducer = bookCommentsSlice.reducer;
