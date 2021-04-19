// FIXME: SAMPLE CODE

export interface User {
  id: number;
  email: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export type UserInput = Partial<User>;
