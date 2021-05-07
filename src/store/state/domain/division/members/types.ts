export interface Member {
  id: number;
  userId: number;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  roleNames: string[];
}

export type MemberInput = Partial<Member>;

export interface MemberDetail {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
}

export interface MemberUserDetail {
  id: number;
  userId: number;
  name: string | null;
  memberCreatedAt: string | null;
  memberUpdatedAt: string | null;
  userCreatedAt: string | null;
  userUpdatedAt: string | null;
  roleNames: string[];
}
