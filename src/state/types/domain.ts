import { EntitiesState } from 'src/state/types/base';
import { BookUrl } from 'src/state/urls';

export interface Book {
  id: string;
  title: string;
  author: string | null;
  releaseDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface DomainState {
  books: EntitiesState<Book, {}, Book, BookUrl>;
}
