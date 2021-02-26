import { combineReducers } from '@reduxjs/toolkit';
import { booksReducer } from 'src/state/ducks/domain/books/slice';

export default combineReducers({ books: booksReducer });
