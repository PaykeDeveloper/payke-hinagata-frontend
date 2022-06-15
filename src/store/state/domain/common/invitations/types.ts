export enum InvitationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied',
}

export interface Invitation {
  id: number;
  name: string;
  email: string;
  status: InvitationStatus;
  roleNames: string[];
  createdBy: number | null;
  createdAt: string | null;
}

export type InvitationCreateInput = {
  name?: string;
  email?: string;
  roleNames?: string[];
  locale?: string;
};

export type InvitationUpdateInput = {
  name?: string;
  roleNames?: string[];
};
