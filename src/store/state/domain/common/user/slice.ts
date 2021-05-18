import { authActions } from 'src/store/state/app/auth/slice';
import { getMyUserApiUrl } from 'src/store/urls';
import { createEntitySlice, getEntityInitialState } from 'src/store/utils';
import { MyUser, MyUserInput } from './types';

const userSlice = createEntitySlice<MyUser, {}, MyUserInput>(
  'user',
  getEntityInitialState(),
  getMyUserApiUrl,
  (state) => state.domain.common.user,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntityInitialState())
);

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
