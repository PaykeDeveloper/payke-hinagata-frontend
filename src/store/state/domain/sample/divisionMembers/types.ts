// FIXME: SAMPLE CODE

export interface DivisionMember {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
}

export type DivisionMemberInput = Partial<DivisionMember>;

export interface DivisionMemberDetail {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  requestMemberId: number | null;
}
