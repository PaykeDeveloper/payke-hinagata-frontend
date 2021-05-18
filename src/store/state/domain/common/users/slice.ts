// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import { UserApiUrl, getUsersApiUrl, getUserApiUrl } from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { User, UserInput } from './types';

const usersSlice = createEntitiesSlice<User, {}, User, UserApiUrl, UserInput>(
  'users',
  getEntitiesInitialState(),
  getUsersApiUrl,
  getUserApiUrl,
  (state) => state.domain.common.users,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
