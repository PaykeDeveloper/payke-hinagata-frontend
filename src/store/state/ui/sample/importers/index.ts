// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { bookImportersReducer, BookImportersState } from './books/slice';
export interface ImporterState {
  books: BookImportersState;
}

export default combineReducers({
  books: bookImportersReducer,
});
