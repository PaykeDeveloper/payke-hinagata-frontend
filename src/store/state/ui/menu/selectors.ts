import { StoreState } from 'src/store';

export const menuDivisionIdSelector = (state: StoreState) =>
  state.ui.menu.divisionId;
