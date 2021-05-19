// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  ProjectApiUrl,
  DivisionApiUrl,
  getProjectApiUrl,
  getProjectsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Project, ProjectDetail, ProjectInput } from './types';

const projectsSlice = createEntitiesSlice<
  Project,
  DivisionApiUrl,
  ProjectDetail,
  ProjectApiUrl,
  ProjectInput
>(
  'projects',
  getEntitiesInitialState(),
  getProjectsApiUrl,
  getProjectApiUrl,
  (state) => state.domain.sample.projects,
  { objectKey: 'id', pathKey: 'projectId' },
  (entity) => entity,
  (entity) => entity,
  undefined,
  (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState())
);

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
