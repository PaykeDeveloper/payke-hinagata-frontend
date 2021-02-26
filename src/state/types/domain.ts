import { EntitiesState } from 'src/state/types/base';
import { BookPath } from 'src/state/urls';

export interface Book {
  id: string;
  title: string;
}

export interface DomainState {
  books: EntitiesState<Book, {}, Book, BookPath>;
}
