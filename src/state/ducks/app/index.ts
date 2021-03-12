import { combineReducers } from '@reduxjs/toolkit';
import { statusReducer } from 'src/state/ducks/app/status/slice';
import { Status } from 'src/state/ducks/app/status/types';
import { EntityState } from 'src/state/types';

export interface AppState {
  status: EntityState<Status, unknown>;
}

const reducer = combineReducers({
  status: statusReducer,
});

export default reducer;
