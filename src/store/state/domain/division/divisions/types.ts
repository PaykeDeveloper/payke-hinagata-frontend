// FIXME: SAMPLE CODE

export interface Division {
  id: number;
  name: string;
  requestMemberId: number | null;
  permissionNames: string[];
  createdAt: string | null;
}

export type DivisionInput = Partial<Division>;
