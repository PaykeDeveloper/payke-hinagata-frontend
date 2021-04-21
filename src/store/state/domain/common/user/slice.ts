import { getMyUserApiUrl } from 'src/store/urls';
import { createEntitySlice, getEntityInitialState } from 'src/store/utils';

const userSlice = createEntitySlice(
  'user',
  getEntityInitialState(),
  getMyUserApiUrl,
  (state) => state.domain.common.user
);

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
