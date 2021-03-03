import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import reducers from './ducks';

const reducer = combineReducers(reducers);

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const useStoreSelector: TypedUseSelectorHook<RootState> = (
  selector,
  equalityFn = shallowEqual
) => useSelector(selector, equalityFn);

export const useStoreDispatch = () => useDispatch<Dispatch>();

export default store;
