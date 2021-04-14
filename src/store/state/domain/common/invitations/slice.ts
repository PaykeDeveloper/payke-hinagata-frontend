import {
  getInvitationApiUrl,
  getInvitationsApiUrl,
  InvitationApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Invitation, InvitationInput } from './types';

const invitationsSlice = createEntitiesSlice<
  Invitation,
  {},
  Invitation,
  InvitationApiUrl,
  InvitationInput
>(
  'invitations',
  getEntitiesInitialState(),
  getInvitationsApiUrl,
  getInvitationApiUrl,
  (state) => state.domain.common.invitations
);

export const invitationsActions = invitationsSlice.actions;
export const invitationsReducer = invitationsSlice.reducer;
