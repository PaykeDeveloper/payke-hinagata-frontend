// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { userSelector } from 'src/store/state/domain/common/users/selectors';
import { RootState } from 'src/store/state/index';
import { OwnPermissionFactory } from 'src/store/utils';
import { userPermissionNamesSelector } from '../../common/user/selectors';
import {
  divisionSelector,
  memberPermissionNamesSelector,
} from '../divisions/selectors';

const memberPermission = new OwnPermissionFactory('member');

export const membersSelector = (state: StoreState) =>
  state.domain.division.members.entities;

export const membersStatusSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntities.status;

export const membersErrorSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntities.error;

export const memberSelector = (state: StoreState) =>
  state.domain.division.members.entity;

export const memberStatusSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntity.status;

export const memberErrorSelector = (state: StoreState) =>
  state.domain.division.members.meta.fetchEntity.error;

export const checkViewMembersSelector = createSelector(
  memberPermissionNamesSelector,
  userPermissionNamesSelector,
  (memberPermissionNames, userPermissionNames) =>
    memberPermission.canView(memberPermissionNames) ||
    memberPermission.canView(userPermissionNames)
);

export const checkCreateMemberSelector = createSelector(
  divisionSelector,
  memberPermissionNamesSelector,
  userPermissionNamesSelector,
  (division, memberPermissionNames, userPermissionNames) =>
    division?.requestMemberId !== null
      ? memberPermission.canCreate(memberPermissionNames)
      : memberPermission.canCreateAll(userPermissionNames)
);

export const checkUpdateMembersSelector = createSelector(
  divisionSelector,
  memberPermissionNamesSelector,
  userPermissionNamesSelector,
  (division, memberPermissionNames, userPermissionNames) =>
    division?.requestMemberId !== null
      ? memberPermission.canUpdate(memberPermissionNames)
      : memberPermission.canUpdateAll(userPermissionNames)
);

export const checkDeleteMemberSelector = createSelector(
  divisionSelector,
  memberPermissionNamesSelector,
  userPermissionNamesSelector,
  (division, memberPermissionNames, userPermissionNames) =>
    division?.requestMemberId !== null
      ? memberPermission.canDelete(memberPermissionNames)
      : memberPermission.canDeleteAll(userPermissionNames)
);
