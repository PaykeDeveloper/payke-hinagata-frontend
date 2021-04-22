import { getRolesApiUrl } from 'src/store/urls';
import { createEntitiesSlice, getEntitiesInitialState } from 'src/store/utils';
import { Role } from './types';

const rolesSlice = createEntitiesSlice<Role, {}, Role, {}, {}, {}>(
  'roles',
  getEntitiesInitialState(),
  getRolesApiUrl,
  () => '',
  (state) => state.domain.common.roles
);

export const rolesActions = rolesSlice.actions;
export const rolesReducer = rolesSlice.reducer;
