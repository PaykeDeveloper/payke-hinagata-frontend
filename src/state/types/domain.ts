import {
  BookComment,
  BookCommentDetail,
} from 'src/state/ducks/domain/bookComments/types';
import { Book } from 'src/state/ducks/domain/books/types';
import { EntitiesState } from 'src/state/types/base';
import { BookApiUrl, BookCommentApiUrl } from 'src/state/urls';

export interface DomainState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
}
