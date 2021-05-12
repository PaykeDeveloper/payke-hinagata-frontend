export interface User {
  id: number;
  name: string;
  email: string;
  permissionNames: string[];
  roleNames: string[];
  createdAt: string | null;
  updatedAt: string | null;
}
