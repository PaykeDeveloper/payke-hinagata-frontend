// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import { BookImporterInput } from 'src/store/state/ui/sample/books/types';
import { EntitiesState } from 'src/store/types';
import { bookImportersReducer, BookImportersState } from './books/slice';
export interface SampleState {
  bookImporters: BookImportersState;
}

export default combineReducers({
  bookImporters: bookImportersReducer,
});
