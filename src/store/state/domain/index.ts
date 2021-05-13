import { combineReducers } from '@reduxjs/toolkit';
import commonReducer, { CommonState } from './common';
import divisionReducer, { DivisionState } from './division';
import sampleReducer, { SampleState } from './sample';

export interface DomainState {
  common: CommonState;

  // FIXME: SAMPLE CODE
  division: DivisionState;
  sample: SampleState;
}

export default combineReducers({
  common: commonReducer,

  // FIXME: SAMPLE CODE
  division: divisionReducer,
  sample: sampleReducer,
});
