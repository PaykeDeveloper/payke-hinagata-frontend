// FIXME: SAMPLE CODE

export interface Division {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export type DivisionInput = Partial<Division>;
