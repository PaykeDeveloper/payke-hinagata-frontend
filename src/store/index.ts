import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  type EqualityFn,
  type NoInfer,
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux';
import reducers from './state';

const reducer = combineReducers(reducers);

const store = configureStore({ reducer });

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

interface TypedUseSelectorHook<TState> {
  <TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: EqualityFn<NoInfer<TSelected>>,
  ): TSelected;
}

export const useStoreSelector: TypedUseSelectorHook<StoreState> = (
  selector,
  equalityFn = shallowEqual,
) => useSelector(selector, equalityFn);

export const useStoreDispatch = () => useDispatch<StoreDispatch>();

export default store;
