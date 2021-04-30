import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { authActions } from 'src/store/state/app/auth/slice';
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
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getInitialState()),
});

export const menuActions = slice.actions;
export const menuReducer = slice.reducer;
