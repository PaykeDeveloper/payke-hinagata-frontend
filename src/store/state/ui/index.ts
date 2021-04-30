import { combineReducers } from '@reduxjs/toolkit';
import { menuReducer } from './menu/slice';
import { MenuState } from './menu/types';

export interface UiState {
  menu: MenuState;
}

export default combineReducers({
  menu: menuReducer,
});
