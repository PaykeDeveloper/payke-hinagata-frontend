import { getLocalesApiUrl } from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { DomainLocale } from './types';

const localesSlice = createEntitiesSlice<
  DomainLocale,
  {},
  DomainLocale,
  {},
  {},
  {}
>(
  'locales',
  getEntitiesInitialState(),
  getLocalesApiUrl,
  () => '',
  (state) => state.domain.common.locales
);

export const localesActions = localesSlice.actions;
export const localesReducer = localesSlice.reducer;
