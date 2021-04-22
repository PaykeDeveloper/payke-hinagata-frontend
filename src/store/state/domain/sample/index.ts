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
  DivisionProjectApiUrl,
  UserApiUrl,
  DivisionMemberApiUrl,
} from 'src/store/urls';
import { bookCommentsReducer } from './bookComments/slice';
import { booksReducer } from './books/slice';
import { divisionMembersReducer } from './divisionMembers/slice';
import { DivisionMember, DivisionMemberDetail } from './divisionMembers/types';
import { divisionProjectsReducer } from './divisionProjects/slice';
import {
  DivisionProject,
  DivisionProjectDetail,
} from './divisionProjects/types';
import { divisionsReducer } from './divisions/slice';
import { Division } from './divisions/types';
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
  divisions: EntitiesState<Division, {}, Division, DivisionApiUrl>;
  divisionMembers: EntitiesState<
    DivisionMember,
    DivisionApiUrl,
    DivisionMemberDetail,
    DivisionMemberApiUrl
  >;
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
  divisionMembers: divisionMembersReducer,
  divisionProjects: divisionProjectsReducer,
});
