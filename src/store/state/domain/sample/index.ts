// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { User } from 'src/store/state/domain/common/user/types';
import {
  BookComment,
  BookCommentDetail,
} from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { EntitiesState } from 'src/store/types';
import {
  BookApiUrl,
  BookCommentApiUrl,
  DivisionApiUrl,
  ProjectApiUrl,
  UserApiUrl,
} from 'src/store/urls';
import { bookCommentsReducer } from './bookComments/slice';
import { booksReducer } from './books/slice';
import { projectsReducer } from './projects/slice';
import { Project, ProjectDetail } from './projects/types';
import { usersReducer } from './users/slice';

export interface SampleState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
  users: EntitiesState<User, {}, User, UserApiUrl>;
  projects: EntitiesState<
    Project,
    DivisionApiUrl,
    ProjectDetail,
    ProjectApiUrl
  >;
}

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
  users: usersReducer,
  projects: projectsReducer,
});
