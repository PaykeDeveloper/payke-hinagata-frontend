// FIXME: SAMPLE CODE

export interface Book {
  id: number;
  title: string;
  author: string | null;
  releaseDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type BookInput = Partial<Book>;
