// FIXME: SAMPLE CODE

import {
  DivisionApiUrl,
  DivisionMemberApiUrl,
  getDivisionMembersApiUrl,
  getDivisionMemberApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import {
  DivisionMember,
  DivisionMemberDetail,
  DivisionMemberInput,
} from './types';

const divisionMembersSlice = createEntitiesSlice<
  DivisionMember,
  DivisionApiUrl,
  DivisionMemberDetail,
  DivisionMemberApiUrl,
  DivisionMemberInput
>(
  'divisionMembers',
  getEntitiesInitialState(),
  getDivisionMembersApiUrl,
  getDivisionMemberApiUrl,
  (state) => state.domain.sample.divisionMembers
);

export const divisionMembersActions = divisionMembersSlice.actions;
export const divisionMembersReducer = divisionMembersSlice.reducer;
