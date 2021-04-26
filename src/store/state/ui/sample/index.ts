// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { bookImportersReducer, BookImportersState } from './books/slice';
export interface SampleState {
  bookImporters: BookImportersState;
}

export default combineReducers({
  bookImporters: bookImportersReducer,
});
