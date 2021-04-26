import { combineReducers } from '@reduxjs/toolkit';
import commonReducer, { CommonState } from './common';
import divisionReducer, { DivisionState } from './division';
import sampleReducer, { SampleState } from './sample';

export interface DomainState {
  common: CommonState;
  division: DivisionState;

  // FIXME: SAMPLE CODE
  sample: SampleState;
}

export default combineReducers({
  common: commonReducer,

  division: divisionReducer,

  // FIXME: SAMPLE CODE
  sample: sampleReducer,
});
