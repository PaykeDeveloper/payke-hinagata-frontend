import { combineReducers } from '@reduxjs/toolkit';
import { statusReducer } from 'src/state/ducks/app/status/slice';

const reducer = combineReducers({
  status: statusReducer,
});

export default reducer;
