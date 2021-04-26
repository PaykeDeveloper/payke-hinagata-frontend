// FIXME: SAMPLE CODE

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
  (state) => state.domain.sample.projects
);

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
