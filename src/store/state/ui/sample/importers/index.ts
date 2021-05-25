// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import {
  projectImportersReducer,
  ProjectImportersState,
} from './projects/slice';
export interface ImporterState {
  projects: ProjectImportersState;
}

export default combineReducers({
  projects: projectImportersReducer,
});
