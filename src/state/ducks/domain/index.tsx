import { combineReducers } from '@reduxjs/toolkit';
import { bookCommentsReducer } from 'src/state/ducks/domain/bookComments/slice';
import { booksReducer } from 'src/state/ducks/domain/books/slice';

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
});
