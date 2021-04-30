import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { MenuState } from './types';

const getInitialState = (): MenuState => ({
  divisionId: null,
});

const slice = createSlice({
  name: `${siteName}/menu`,
  initialState: getInitialState(),
  reducers: {
    setDivisionId(state, action: PayloadAction<number | null>) {
      state.divisionId = action.payload;
    },
  },
  extraReducers: {},
});

export const menuActions = slice.actions;
export const menuReducer = slice.reducer;
