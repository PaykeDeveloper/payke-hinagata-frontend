import { combineReducers } from '@reduxjs/toolkit';
import commonReducer, { CommonState } from './common';
import sampleReducer, { SampleState } from './sample';

export interface DomainState {
  common: CommonState;

  // FIXME: SAMPLE CODE
  sample: SampleState;
}

export default combineReducers({
  common: commonReducer,

  // FIXME: SAMPLE CODE
  sample: sampleReducer,
});
