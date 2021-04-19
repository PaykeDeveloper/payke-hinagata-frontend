// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import {
  BookComment,
  BookCommentDetail,
} from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { User } from 'src/store/state/domain/sample/users/types';
import { EntitiesState } from 'src/store/types';
import {
  BookApiUrl,
  BookCommentApiUrl,
  DivisionApiUrl,
  DivisionProjectApiUrl,
  UserApiUrl,
} from 'src/store/urls';
import { bookCommentsReducer } from './bookComments/slice';
import { divisionProjectsReducer } from './divisionProjects/slice';
import { booksReducer } from './books/slice';
import { usersReducer } from './users/slice';
import { divisionsReducer } from './divisions/slice';
import { Division } from './divisions/types';
import {
  DivisionProject,
  DivisionProjectDetail,
} from './divisionProjects/types';

export interface SampleState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
  users: EntitiesState<User, {}, User, UserApiUrl>;
  divisions: EntitiesState<Division, {}, Division, DivisionApiUrl>;
  divisionProjects: EntitiesState<
    DivisionProject,
    DivisionApiUrl,
    DivisionProjectDetail,
    DivisionProjectApiUrl
  >;
}

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
  users: usersReducer,
  divisions: divisionsReducer,
  divisionProjects: divisionProjectsReducer,
});
