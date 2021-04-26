// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { EntitiesState } from 'src/store/types';
import { DivisionApiUrl, MemberApiUrl } from 'src/store/urls';
import { divisionsReducer } from '../division/divisions/slice';
import { Division } from '../division/divisions/types';
import { membersReducer } from './members/slice';
import { Member, MemberDetail } from './members/types';

export interface DivisionState {
  divisions: EntitiesState<Division, {}, Division, DivisionApiUrl>;
  members: EntitiesState<Member, DivisionApiUrl, MemberDetail, MemberApiUrl>;
}

export default combineReducers({
  divisions: divisionsReducer,
  members: membersReducer,
});
