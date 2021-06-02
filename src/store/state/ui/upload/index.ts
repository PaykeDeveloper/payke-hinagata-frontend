import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer, { SampleState } from './sample';

export interface UploadState {
  // FIXME: SAMPLE CODE
  sample: SampleState;
}
export default combineReducers({
  // FIXME: SAMPLE CODE
  sample: sampleReducer,
});
