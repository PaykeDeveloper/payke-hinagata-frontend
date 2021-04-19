// FIXME: SAMPLE CODE

import { UserApiUrl, getUsersApiUrl, getUserApiUrl } from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { User, UserInput } from './types';

const usersSlice = createEntitiesSlice<User, {}, User, UserApiUrl, UserInput>(
  'users',
  getEntitiesInitialState(),
  getUsersApiUrl,
  getUserApiUrl,
  (state) => state.domain.sample.users
);

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
