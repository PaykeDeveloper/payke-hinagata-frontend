// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { UploadState } from 'src/store/types';
import { uploadProjectsReducer } from './projects/slice';
import { UploadProjectInput } from './projects/types';

export interface SampleState {
  projects: UploadState<UploadProjectInput>;
}

export default combineReducers({
  projects: uploadProjectsReducer,
});
