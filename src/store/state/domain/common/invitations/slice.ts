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
>({
  domainName: 'invitations',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getInvitationsApiUrl,
  entityUrl: getInvitationApiUrl,
  domainSelector: (state) => state.domain.common.invitations,
  keyMapping: { objectKey: 'id', pathKey: 'invitationId' },
  detailToList: (entity) => entity,
  listToDetail: (entity) => entity,
  sort: { key: 'createdAt', reverse: true, skipUpdated: true },
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState()),
});

export const invitationsActions = invitationsSlice.actions;
export const invitationsReducer = invitationsSlice.reducer;
