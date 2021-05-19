import { createSelector } from 'reselect';
import { StoreState } from 'src/store';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import { AllPermissionFactory } from 'src/store/utils';

export const invitationPermission = new AllPermissionFactory('invitation');

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

export const canViewInvitationsSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => invitationPermission.canView(permissionNames)
);

export const canCreateInvitationSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => invitationPermission.canCreate(permissionNames)
);

export const canUpdateInvitationSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => invitationPermission.canUpdate(permissionNames)
);

export const canDeleteInvitationSelector = createSelector(
  userPermissionNamesSelector,
  (permissionNames) => invitationPermission.canDelete(permissionNames)
);

export const canEditInvitationSelector = createSelector(
  canUpdateInvitationSelector,
  canDeleteInvitationSelector,
  (canUpdate, canDelete) => canUpdate || canDelete
);
