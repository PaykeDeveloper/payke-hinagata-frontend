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

export type InvitationInput = {
  email?: string;
  locale?: LocaleType;
};

export enum LocaleType {
  English = 'en',
  Japanese = 'ja',
}
