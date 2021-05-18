// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { EntitiesState } from 'src/store/types';
import {
  BookApiUrl,
  BookCommentApiUrl,
  DivisionApiUrl,
  ProjectApiUrl,
} from 'src/store/urls';
import { bookCommentsReducer } from './bookComments/slice';
import { BookComment, BookCommentDetail } from './bookComments/types';
import { booksReducer } from './books/slice';
import { Book } from './books/types';
import { projectsReducer } from './projects/slice';
import { Project, ProjectDetail } from './projects/types';

export interface SampleState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
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
  projects: projectsReducer,
});
