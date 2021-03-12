// FIXME: SAMPLE CODE

export enum FooBarType {
  Foo = 'foo',
  Bar = 'bar',
}

export interface BookComment {
  id: string;
  bookId: number;
  // confirmed: 0 | 1;
  // publishDate: string;
  // approvedAt: string;
  // amount: number;
  // column: number;
  // choices: 'foo' | 'bar';
  // description: string;
  // votes: number;
  // slug: string;
  // cover: string | null;
}

export interface BookCommentDetail {
  id: string;
  bookId: number;
  confirmed: boolean;
  publishDate: string;
  approvedAt: string;
  amount: number;
  column: number;
  choices: FooBarType;
  description: string;
  votes: number;
  slug: string;
  coverUrl: string | null;
}

export interface BookCommentInput {
  id: string;
  bookId: number;
  confirmed: boolean;
  publishDate: string;
  approvedAt: string;
  amount: number;
  column: number;
  choices: FooBarType;
  description: string;
  votes: number;
  slug: string;
  cover?: unknown;
}
