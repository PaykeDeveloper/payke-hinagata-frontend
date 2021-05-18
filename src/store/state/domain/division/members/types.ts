// FIXME: SAMPLE CODE

export interface Member {
  id: number;
  userId: number;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  roleNames: string[];
}

export type MemberInput = Partial<Member>;
