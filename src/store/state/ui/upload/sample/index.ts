// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { UploadState } from 'src/store/types';
import { DivisionPath } from 'src/view/routes/paths';
import { uploadProjectsReducer } from './projects/slice';
import { UploadProjectInput } from './projects/types';

export interface SampleState {
  projects: UploadState<UploadProjectInput, DivisionPath>;
}

export default combineReducers({
  projects: uploadProjectsReducer,
});
