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
>({
  domainName: 'locales',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getLocalesApiUrl,
  entityUrl: () => '',
  domainSelector: (state) => state.domain.common.locales,
});

export const localesActions = localesSlice.actions;
export const localesReducer = localesSlice.reducer;
