export interface User {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string | null;
  permissionNames: string[];
  roleNames: string[];
  locale: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export type UserInput = Partial<User>;
