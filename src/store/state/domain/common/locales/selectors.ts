import { StoreState } from 'src/store';

export const localesSelector = (state: StoreState) =>
  state.domain.common.locales.entities;
