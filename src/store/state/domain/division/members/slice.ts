import { authActions } from 'src/store/state/app/auth/slice';
import {
  DivisionApiUrl,
  MemberApiUrl,
  getMembersApiUrl,
  getMemberApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Member, MemberDetail, MemberInput } from './types';

const membersSlice = createEntitiesSlice<
  Member,
  DivisionApiUrl,
  MemberDetail,
  MemberApiUrl,
  MemberInput
>(
  'members',
  getEntitiesInitialState(),
  getMembersApiUrl,
  getMemberApiUrl,
  (state) => state.domain.division.members,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const membersActions = membersSlice.actions;
export const membersReducer = membersSlice.reducer;
