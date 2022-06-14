// FIXME: SAMPLE CODE

export enum Priority {
  High = 'high',
  Middle = 'middle',
  Low = 'low',
}

export interface Project {
  id: number;
  divisionId: number;
  slug: string;
  name: string;
  description: string;
  priority: Priority | null;
  approved: boolean | null;
  startDate: string | null;
  finishedAt: string | null;
  difficulty: number | null;
  coefficient: number | null;
  productivity: number | null;
  coverUrl: string | null;
  lockVersion: number;
  createdAt: string | null;
}

export type ProjectInput = Partial<Omit<Project, 'coverUrl'>> & {
  cover?: unknown;
};
