import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import reducers from './state';

const reducer = combineReducers(reducers);

const store = configureStore({ reducer });

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const useStoreSelector: TypedUseSelectorHook<StoreState> = (
  selector,
  equalityFn = shallowEqual
) => useSelector(selector, equalityFn);

export const useStoreDispatch = () => useDispatch<StoreDispatch>();

export default store;