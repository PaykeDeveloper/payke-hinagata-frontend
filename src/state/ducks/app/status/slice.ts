import { authActions } from 'src/state/ducks/app/auth/slice';
import { Status } from 'src/state/ducks/types';
import {
  createEntitySlice,
  getEntityInitialState,
} from 'src/state/ducks/utils';
import { getStatusApiUrl } from 'src/state/urls';

const statusSlice = createEntitySlice<Status, unknown>(
  'status',
  getEntityInitialState(),
  getStatusApiUrl,
  (state) => state.app.status,
  undefined,
  (builder) =>
    builder
      .addCase(authActions.login.fulfilled, (state) => {
        if (state.entity) {
          state.entity.isAuthenticated = true;
        }
      })
      .addCase(authActions.logout.fulfilled, (state) => {
        if (state.entity) {
          state.entity.isAuthenticated = false;
        }
      })
);

export const statusActions = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
