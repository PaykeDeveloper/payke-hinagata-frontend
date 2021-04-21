import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer, { SampleState } from 'src/store/state/ui/sample';

// FIXME: SAMPLE CODE
export interface UiState {
  sample: SampleState;
}

export default combineReducers({
  sample: sampleReducer,
});
