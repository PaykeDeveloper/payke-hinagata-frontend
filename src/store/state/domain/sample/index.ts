// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { BookImportCsv } from 'src/store/state/domain/sample/bookImportCsvs/types';
import {
  BookComment,
  BookCommentDetail,
} from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { EntitiesState } from 'src/store/types';
import {
  BookApiUrl,
  BookCommentApiUrl,
  BookImportCsvApiUrl,
} from 'src/store/urls';
import { bookImportCsvsReducer } from './bookImportCsvs/slice';
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
  bookImportCsvs: EntitiesState<
    BookImportCsv,
    {},
    BookImportCsv,
    BookImportCsvApiUrl
  >;
}

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
  bookImportCsvs: bookImportCsvsReducer,
});
