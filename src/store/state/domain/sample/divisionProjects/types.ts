// FIXME: SAMPLE CODE

export enum FooBarType {
  Foo = 'foo',
  Bar = 'bar',
}

export interface DivisionProject {
  id: number;
  projectId: number;
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

export interface DivisionProjectDetail {
  id: number;
  projectId: number;
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

export interface DivisionProjectInput {
  id: number;
  projectId: number;
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
