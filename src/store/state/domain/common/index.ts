import { combineReducers } from '@reduxjs/toolkit';
import { EntitiesState } from 'src/store/types';
import { EntityState } from 'src/store/types';
import { InvitationApiUrl, UserApiUrl } from 'src/store/urls';
import { invitationsReducer } from './invitations/slice';
import { Invitation } from './invitations/types';
import { localesReducer } from './locales/slice';
import { DomainLocale } from './locales/types';
import { rolesReducer } from './roles/slice';
import { Role } from './roles/types';
import { userReducer } from './user/slice';
import { MyUser } from './user/types';
import { usersReducer } from './users/slice';
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
