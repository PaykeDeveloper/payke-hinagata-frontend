import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer, { SampleState } from './sample';

// FIXME: SAMPLE CODE

export interface DomainState {
  sample: SampleState;
}

export default combineReducers({
  sample: sampleReducer,
});
