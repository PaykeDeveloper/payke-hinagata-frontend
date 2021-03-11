import { combineReducers } from '@reduxjs/toolkit';
import { bookCommentsReducer } from './bookComments/slice';
import { booksReducer } from './books/slice';

export default combineReducers({
  books: booksReducer,
  bookComments: bookCommentsReducer,
});
