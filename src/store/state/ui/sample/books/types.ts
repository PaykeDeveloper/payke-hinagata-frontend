// FIXME: SAMPLE CODE

import { BookInput } from 'src/store/state/domain/sample/books/types';

export enum ImportStatus {
  Waiting = 0,
  Prepareing = 1,
  Success = 2,
  Failed = -1,
}

export type BookImporter = {
  id: string;
  status: ImportStatus;
  book: BookInput;
};

export type BookImporterInput = Partial<BookInput>;
