// FIXME: SAMPLE CODE

import { BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreError } from 'src/store/types';

export enum ImportStatus {
  Waiting = 0,
  Prepareing = 1,
  Success = 2,
  Failed = -1,
}

export type BookImporter = {
  id: string;
  book: BookInput;
};

export type ImportResult = {
  status: ImportStatus;
  error: StoreError | undefined;
};

export type BookImporterInput = Partial<BookInput>;
