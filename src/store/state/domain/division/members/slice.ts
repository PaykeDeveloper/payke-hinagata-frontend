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
  (state) => state.domain.division.members
);

export const membersActions = membersSlice.actions;
export const membersReducer = membersSlice.reducer;
