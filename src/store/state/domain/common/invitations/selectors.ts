import { StoreState } from 'src/store';
import {
  AllPermissionFactory,
  OwnPermissionFactory,
  PermissionFactory,
} from '../permissions/factories';

export const invitationOwnPermissionFactory: PermissionFactory<'invitation'> = new OwnPermissionFactory(
  'invitation'
);
export const invitationAllPermissionFactory: PermissionFactory<'invitation'> = new AllPermissionFactory(
  'invitation'
);

export const invitationsSelector = (state: StoreState) =>
  state.domain.common.invitations.entities;

export const invitationsStatusSelector = (state: StoreState) =>
  state.domain.common.invitations.meta.fetchEntities.status;

export const invitationsErrorSelector = (state: StoreState) =>
  state.domain.common.invitations.meta.fetchEntities.error;

export const invitationSelector = (state: StoreState) =>
  state.domain.common.invitations.entity;

export const invitationStatusSelector = (state: StoreState) =>
  state.domain.common.invitations.meta.fetchEntity.status;

export const invitationErrorSelector = (state: StoreState) =>
  state.domain.common.invitations.meta.fetchEntity.error;
