import {
  BookComment,
  BookCommentDetail,
  BookCommentInput,
} from 'src/state/ducks/domain/bookComments/types';
import {
  BookCommentUrl,
  BookUrl,
  getBookCommentApiUrl,
  getBookCommentsApiUrl,
} from 'src/state/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/state/utils';

const bookCommentsSlice = createEntitiesSlice<
  BookComment,
  BookUrl,
  BookCommentDetail,
  BookCommentUrl,
  BookCommentInput
>(
  'bookComments',
  getEntitiesInitialState(),
  getBookCommentsApiUrl,
  getBookCommentApiUrl,
  (state) => state.domain.bookComments
);

export const bookCommentsActions = bookCommentsSlice.actions;
export const bookCommentsReducer = bookCommentsSlice.reducer;
