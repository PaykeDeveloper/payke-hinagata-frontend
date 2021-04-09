import { authActions } from 'src/store/state/app/auth/slice';
import { getStatusApiUrl } from 'src/store/urls';
import { createEntitySlice, getEntityInitialState } from 'src/store/utils';
import { Status } from './types';

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
      .addCase(authActions.register.fulfilled, (state) => {
        if (state.entity) {
          state.entity.isAuthenticated = true;
        }
      })
);

export const statusActions = statusSlice.actions;
export const statusReducer = statusSlice.reducer;
