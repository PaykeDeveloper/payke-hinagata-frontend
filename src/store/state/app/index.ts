import { combineReducers } from '@reduxjs/toolkit';
import { statusReducer } from 'src/store/state/app/status/slice';
import { Status } from 'src/store/state/app/status/types';
import { EntityState } from 'src/store/types';

export interface AppState {
  status: EntityState<Status, unknown>;
}

const reducer = combineReducers({
  status: statusReducer,
});

export default reducer;
