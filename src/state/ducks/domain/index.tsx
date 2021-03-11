import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer from './sample';

export default combineReducers({
  sample: sampleReducer,
});
