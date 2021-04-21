import { StoreState } from 'src/store';

export const permissionNamesSelector = (state: StoreState) =>
  state.domain.common.user.entity?.permissionNames;
