export enum InvitationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied',
}

export interface Invitation {
  id: number;
  email: string;
  status: InvitationStatus;
  createdAt: string | null;
  updatedAt: string | null;
}

export type InvitationCreateInput = {
  name?: string;
  email?: string;
  locale?: LocaleType;
};

export type InvitationUpdateInput = {
  name?: string;
};

export enum LocaleType {
  English = 'en',
  Japanese = 'ja',
}
