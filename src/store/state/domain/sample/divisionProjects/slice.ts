// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  DivisionProjectApiUrl,
  DivisionApiUrl,
  getDivisionProjectApiUrl,
  getDivisionProjectsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import {
  DivisionProject,
  DivisionProjectDetail,
  DivisionProjectInput,
} from './types';

const divisionProjectsSlice = createEntitiesSlice<
  DivisionProject,
  DivisionApiUrl,
  DivisionProjectDetail,
  DivisionProjectApiUrl,
  DivisionProjectInput
>(
  'divisionProjects',
  getEntitiesInitialState(),
  getDivisionProjectsApiUrl,
  getDivisionProjectApiUrl,
  (state) => state.domain.sample.divisionProjects,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const divisionProjectsActions = divisionProjectsSlice.actions;
export const divisionProjectsReducer = divisionProjectsSlice.reducer;
