import { combineReducers } from '@reduxjs/toolkit';
import { Invitation } from 'src/store/state/domain/common/invitations/types';
import { EntitiesState } from 'src/store/types';
import { InvitationApiUrl } from 'src/store/urls';
import { invitationsReducer } from './invitations/slice';

export interface CommonState {
  invitations: EntitiesState<Invitation, {}, Invitation, InvitationApiUrl>;
}

export default combineReducers({
  invitations: invitationsReducer,
});
