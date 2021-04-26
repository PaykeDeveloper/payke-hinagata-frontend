// FIXME: SAMPLE CODE

export enum ProjectStatus {
  Backlog = 'backlog',
  Estimate = 'estimate',
  InPlanning = 'in_planning',
  InActive = 'in_active',
  OnHold = 'on_hold',
  Proposed = 'proposed',
  Approved = 'approved',
  InProgress = 'in_progress',
  UAT = 'uat',
  Canceled = 'canceled',
  Terminated = 'terminated',
  Done = 'done',
}

export interface DivisionProject {
  id: number;
  projectId: number;
}

export interface DivisionProjectDetail {
  id: number;
  projectId: number;
  confirmed: boolean;
  startDate: string;
  dueDate: string;
  priority: number;
  salesOrder: number;
  status: ProjectStatus;
  description: string;
  estimatedPeriod: number;
  slug: string;
  coverUrl: string | null;
}

export interface DivisionProjectInput {
  id: number;
  projectId: number;
  confirmed: boolean;
  startDate: string;
  dueDate: string;
  priority: number;
  salesOrder: number;
  status: ProjectStatus;
  description: string;
  estimatedPeriod: number;
  slug: string;
  cover?: unknown;
}
