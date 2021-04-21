// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import {
  BookComment,
  BookCommentDetail,
} from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { EntitiesState } from 'src/store/types';
import { BookApiUrl, BookCommentApiUrl } from 'src/store/urls';
import { bookCommentsReducer } from './bookComments/slice';
import { booksReducer } from './books/slice';

export interface SampleState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
}

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
});
