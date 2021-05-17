// FIXME: SAMPLE CODE

export interface Division {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  requestMemberId: number | null;
}

export type DivisionInput = Partial<Division>;

export interface DivisionDetail {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  requestMemberId: number | null;
}
