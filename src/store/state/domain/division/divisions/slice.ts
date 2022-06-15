// FIXME: SAMPLE CODE

import { authActions } from 'src/store/state/app/auth/slice';
import {
  DivisionApiUrl,
  getDivisionApiUrl,
  getDivisionsApiUrl,
} from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Division, DivisionInput } from './types';

const divisionsSlice = createEntitiesSlice<
  Division,
  {},
  Division,
  DivisionApiUrl,
  DivisionInput
>({
  domainName: 'divisions',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getDivisionsApiUrl,
  entityUrl: getDivisionApiUrl,
  domainSelector: (state) => state.domain.division.divisions,
  keyMapping: { objectKey: 'id', pathKey: 'divisionId' },
  detailToList: (entity) => entity,
  listToDetail: (entity) => entity,
  sort: { key: 'createdAt', reverse: true, skipUpdated: true },
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState()),
});

export const divisionsActions = divisionsSlice.actions;
export const divisionsReducer = divisionsSlice.reducer;
