export interface Role {
  id: number;
  name: string;
  type: RoleType;
  required: boolean;
}

export enum RoleType {
  User = 'user',
  Member = 'member',
}
