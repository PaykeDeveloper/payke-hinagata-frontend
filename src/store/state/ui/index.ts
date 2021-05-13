import { combineReducers } from '@reduxjs/toolkit';
import sampleReducer, { SampleState } from 'src/store/state/ui/sample';
import { menuReducer } from './menu/slice';
import { MenuState } from './menu/types';

export interface UiState {
  menu: MenuState;
  sample: SampleState;
}

export default combineReducers({
  sample: sampleReducer,
  menu: menuReducer,
});
