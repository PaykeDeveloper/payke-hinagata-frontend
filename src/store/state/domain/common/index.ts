import { combineReducers } from '@reduxjs/toolkit';
import { Invitation } from 'src/store/state/domain/common/invitations/types';
import { userReducer } from 'src/store/state/domain/common/user/slice';
import { EntitiesState } from 'src/store/types';
import { EntityState } from 'src/store/types';
import { InvitationApiUrl, UserApiUrl } from 'src/store/urls';
import { usersReducer } from '../common/users/slice';
import { invitationsReducer } from './invitations/slice';
import { localesReducer } from './locales/slice';
import { DomainLocale } from './locales/types';
import { rolesReducer } from './roles/slice';
import { Role } from './roles/types';
import { MyUser } from './user/types';
import { User } from './users/types';

export interface CommonState {
  invitations: EntitiesState<Invitation, {}, Invitation, InvitationApiUrl>;
  user: EntityState<MyUser, {}>;
  users: EntitiesState<User, {}, User, UserApiUrl>;
  roles: EntitiesState<Role, {}, Role, {}>;
  locales: EntitiesState<DomainLocale, {}, DomainLocale, {}>;
}

export default combineReducers({
  invitations: invitationsReducer,
  user: userReducer,
  users: usersReducer,
  roles: rolesReducer,
  locales: localesReducer,
});
