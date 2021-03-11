import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer, { SampleState } from './sample';

export interface DomainState {
  sample: SampleState;
}

export default combineReducers({
  sample: sampleReducer,
});
