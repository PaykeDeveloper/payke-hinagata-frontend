import {
  getInvitationApiUrl,
  getInvitationsApiUrl,
  InvitationApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import {
  Invitation,
  InvitationCreateInput,
  InvitationUpdateInput,
} from './types';

const invitationsSlice = createEntitiesSlice<
  Invitation,
  {},
  Invitation,
  InvitationApiUrl,
  InvitationCreateInput,
  InvitationUpdateInput
>(
  'invitations',
  getEntitiesInitialState(),
  getInvitationsApiUrl,
  getInvitationApiUrl,
  (state) => state.domain.common.invitations
);

export const invitationsActions = invitationsSlice.actions;
export const invitationsReducer = invitationsSlice.reducer;
