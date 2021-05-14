// FIXME: SAMPLE CODE

import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from 'src/store';
import { userPermissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import {
  memberPermissionNamesSelector,
  requestMemberIdSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { OwnPermissionFactory } from 'src/store/utils';

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

export const canViewMembersSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    memberPermission.canView(memberPermissionNames) ||
    memberPermission.canViewAll(userPermissionNames)
);

export const canCreateMembersSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    memberPermission.canCreate(memberPermissionNames) ||
    memberPermission.canCreateAll(userPermissionNames)
);

export const canUpdateMembersSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    memberPermission.canUpdate(memberPermissionNames) ||
    memberPermission.canUpdateAll(userPermissionNames)
);

export const canDeleteMembersSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  (userPermissionNames, memberPermissionNames) =>
    memberPermission.canDelete(memberPermissionNames) ||
    memberPermission.canDeleteAll(userPermissionNames)
);

export const checkViewMemberSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  requestMemberIdSelector,
  (userPermissionNames, memberPermissionNames, requestMemberId) => (
    memberId?: number
  ) => {
    if (memberPermission.canViewAll(memberPermissionNames)) {
      return true;
    }
    if (
      memberId &&
      memberId === requestMemberId &&
      memberPermission.canViewOwn(memberPermissionNames)
    ) {
      return true;
    }
    return memberPermission.canViewAll(userPermissionNames);
  }
);

export const checkUpdateMemberSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  requestMemberIdSelector,
  (userPermissionNames, memberPermissionNames, requestMemberId) => (
    memberId?: number
  ) => {
    if (memberPermission.canUpdateAll(memberPermissionNames)) {
      return true;
    }
    if (
      memberId &&
      memberId === requestMemberId &&
      memberPermission.canUpdateOwn(memberPermissionNames)
    ) {
      return true;
    }
    return memberPermission.canUpdateAll(userPermissionNames);
  }
);

export const checkDeleteMemberSelector = createSelector(
  userPermissionNamesSelector,
  memberPermissionNamesSelector,
  requestMemberIdSelector,
  (userPermissionNames, memberPermissionNames, requestMemberId) => (
    memberId?: number
  ) => {
    if (memberPermission.canDeleteAll(memberPermissionNames)) {
      return true;
    }
    if (
      memberId &&
      memberId === requestMemberId &&
      memberPermission.canDeleteOwn(memberPermissionNames)
    ) {
      return true;
    }
    return memberPermission.canDeleteAll(userPermissionNames);
  }
);
