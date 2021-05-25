// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { EntitiesState } from 'src/store/types';
import { DivisionApiUrl, ProjectApiUrl } from 'src/store/urls';
import { projectsReducer } from './projects/slice';
import { Project } from './projects/types';

export interface SampleState {
  projects: EntitiesState<Project, DivisionApiUrl, Project, ProjectApiUrl>;
}

export default combineReducers({
  projects: projectsReducer,
});
