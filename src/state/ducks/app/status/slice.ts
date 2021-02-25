import { authActions } from 'src/state/ducks/app/auth/slice';
import createEntitySlice, {
  getEntityInitialState,
} from 'src/state/ducks/utils/createEntitySlice';
import { getStatusApiUrl } from 'src/state/urls';
import { Status } from 'src/state/ducks/types';

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
