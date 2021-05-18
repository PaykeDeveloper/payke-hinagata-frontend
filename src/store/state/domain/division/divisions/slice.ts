// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  DivisionApiUrl,
  getDivisionApiUrl,
  getDivisionsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Division, DivisionInput } from './types';

const divisionsSlice = createEntitiesSlice<
  Division,
  {},
  Division,
  DivisionApiUrl,
  DivisionInput
>(
  'divisions',
  getEntitiesInitialState(),
  getDivisionsApiUrl,
  getDivisionApiUrl,
  (state) => state.domain.division.divisions,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const divisionsActions = divisionsSlice.actions;
export const divisionsReducer = divisionsSlice.reducer;
