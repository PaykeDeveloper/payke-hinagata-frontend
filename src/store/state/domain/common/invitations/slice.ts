import { authActions } from 'src/store/state/app/auth/slice';
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
  (state) => state.domain.common.invitations,
  { objectKey: 'id', pathKey: 'invitationId' },
  (entity) => entity,
  (entity) => entity,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const invitationsActions = invitationsSlice.actions;
export const invitationsReducer = invitationsSlice.reducer;
