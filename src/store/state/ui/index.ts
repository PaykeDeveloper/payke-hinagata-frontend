import { combineReducers } from '@reduxjs/toolkit';
import { menuReducer } from './menu/slice';
import { MenuState } from './menu/types';
import uploadReducer, { UploadState } from './upload';

export interface UiState {
  menu: MenuState;
  upload: UploadState;
}

export default combineReducers({
  menu: menuReducer,
  upload: uploadReducer,
});
