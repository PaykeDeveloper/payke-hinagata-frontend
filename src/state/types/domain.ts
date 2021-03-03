import {
  BookComment,
  BookCommentDetail,
} from 'src/state/ducks/domain/bookComments/types';
import { EntitiesState } from 'src/state/types/base';
import { BookCommentUrl, BookUrl } from 'src/state/urls';

export interface Book {
  id: number;
  title: string;
  author: string | null;
  releaseDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DomainState {
  books: EntitiesState<Book, {}, Book, BookUrl>;
  bookComments: EntitiesState<
    BookComment,
    BookUrl,
    BookCommentDetail,
    BookCommentUrl
  >;
}
