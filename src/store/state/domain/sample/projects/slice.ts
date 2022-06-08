// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  ProjectApiUrl,
  DivisionApiUrl,
  getProjectApiUrl,
  getProjectsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Project, ProjectInput } from './types';

const projectsSlice = createEntitiesSlice<
  Project,
  DivisionApiUrl,
  Project,
  ProjectApiUrl,
  ProjectInput
>({
  domainName: 'projects',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getProjectsApiUrl,
  entityUrl: getProjectApiUrl,
  domainSelector: (state) => state.domain.sample.projects,
  keyMapping: { objectKey: 'slug', pathKey: 'projectSlug' },
  detailToList: (entity) => entity,
  listToDetail: (entity) => entity,
  sort: { key: 'createdAt', reverse: true, skipUpdated: true },
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState()),
});

export const projectsActions = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
