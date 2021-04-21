import { authActions } from 'src/store/state/app/auth/slice';
import { getMyUserApiUrl } from 'src/store/urls';
import { createEntitySlice, getEntityInitialState } from 'src/store/utils';
import { getMetaInitialState } from 'src/store/utils/createEntitySlice';

const userSlice = createEntitySlice(
  'user',
  getEntityInitialState(),
  getMyUserApiUrl,
  (state) => state.domain.common.user,
  {
    reset: () => getEntityInitialState(),
  },
  (builder) => {
    builder.addCase(authActions.resetAll, (state, _) => {
      state.entity = undefined;
      state.meta.fetchEntity = getMetaInitialState();
    });
  }
);

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
