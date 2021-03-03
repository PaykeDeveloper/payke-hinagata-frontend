import {
  BookComment,
  BookCommentDetail,
} from 'src/state/ducks/domain/bookComments/types';
import { EntitiesState } from 'src/state/types/base';
import { BookCommentApiUrl, BookApiUrl } from 'src/state/urls';

export interface Book {
  id: number;
  title: string;
  author: string | null;
  releaseDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DomainState {
  books: EntitiesState<Book, {}, Book, BookApiUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookApiUrl,
    BookCommentDetail,
    BookCommentApiUrl
  >;
}
