export interface MyUser {
  id: number;
  name: string;
  email: string;
  emailVerifiedAt: string | null;
  permissionNames: string[];
  roleNames: string[];
  locale: string | null;
  createdAt: string | null;
}

export interface MyUserInput {
  locale: string | null;
}
