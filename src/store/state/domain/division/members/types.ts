// FIXME: SAMPLE CODE

export interface Member {
  id: number;
  divisionId: number;
  userId: number;
  permissionNames: string[];
  roleNames: string[];
  createdAt: string | null;
}

export type MemberInput = Partial<Member>;
