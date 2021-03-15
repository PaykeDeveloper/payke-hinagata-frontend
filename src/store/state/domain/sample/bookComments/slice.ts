// FIXME: SAMPLE CODE

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
  (state) => state.domain.sample.bookComments
);

export const bookCommentsActions = bookCommentsSlice.actions;
export const bookCommentsReducer = bookCommentsSlice.reducer;
