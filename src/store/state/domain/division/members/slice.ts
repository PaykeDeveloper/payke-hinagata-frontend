// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  DivisionApiUrl,
  MemberApiUrl,
  getMemberApiUrl,
  getMembersApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Member, MemberInput } from './types';

const membersSlice = createEntitiesSlice<
  Member,
  DivisionApiUrl,
  Member,
  MemberApiUrl,
  MemberInput
>({
  domainName: 'members',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getMembersApiUrl,
  entityUrl: getMemberApiUrl,
  domainSelector: (state) => state.domain.division.members,
  keyMapping: { objectKey: 'id', pathKey: 'memberId' },
  detailToList: (entity) => entity,
  listToDetail: (entity) => entity,
  sort: { key: 'createdAt', reverse: true, skipUpdated: true },
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState()),
});

export const membersActions = membersSlice.actions;
export const membersReducer = membersSlice.reducer;
