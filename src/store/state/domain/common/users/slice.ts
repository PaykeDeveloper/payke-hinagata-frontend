import { authActions } from 'src/store/state/app/auth/slice';
import { UserApiUrl, getUsersApiUrl, getUserApiUrl } from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { User, UserInput } from './types';

const usersSlice = createEntitiesSlice<User, {}, User, UserApiUrl, UserInput>({
  domainName: 'users',
  initialState: getEntitiesInitialState(),
  entitiesUrl: getUsersApiUrl,
  entityUrl: getUserApiUrl,
  domainSelector: (state) => state.domain.common.users,
  keyMapping: { objectKey: 'id', pathKey: 'userId' },
  detailToList: (entity) => entity,
  listToDetail: (entity) => entity,
  sort: { key: 'createdAt', reverse: true, skipUpdated: true },
  extraReducers: (builder) =>
    builder.addCase(authActions.resetAll, () => getEntitiesInitialState()),
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
