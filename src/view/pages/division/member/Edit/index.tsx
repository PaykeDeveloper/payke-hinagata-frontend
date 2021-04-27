// FIXME: SAMPLE CODE

import React, {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { objectToInputs } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  memberRolesSelector,
  rolesStatusSelector,
} from 'src/store/state/domain/common/roles/selectors';
import {
  usersErrorSelector,
  usersStatusSelector,
} from 'src/store/state/domain/common/users/selectors';
import {
  divisionSelector,
  divisionStatusSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import {
  memberDeletePermissionCheckSelector,
  memberUsersSelector,
} from 'src/store/state/domain/division/members/selectors';
import {
  memberErrorSelector,
  memberSelector,
  memberStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import { MemberPath, divisionsPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form, { PermissionList } from '../components/Form';
import { usersActions } from 'src/store/state/domain/common/users/slice';

type ChildProps = ComponentProps<typeof Form>;

const permissionSelector = createSelector(
  memberDeletePermissionCheckSelector,
  (memberDelete) =>
    ({
      memberDelete,
    } as PermissionList)
);

const selector = createSelector(
  [
    divisionSelector,
    divisionStatusSelector,
    memberRolesSelector,
    rolesStatusSelector,
    memberUsersSelector,
    usersStatusSelector,
    usersErrorSelector,
    memberSelector,
    memberStatusSelector,
    memberErrorSelector,
    permissionSelector,
  ],
  (
    division,
    divisionStatus,
    memberRoles,
    rolesStatus,
    memberUsers,
    usersStatus,
    usersError,
    member,
    memberStatus,
    memberError,
    permissions
  ) => ({
    division,
    memberRoles,
    memberUsers,
    member,
    statuses: [divisionStatus, rolesStatus, memberStatus, usersStatus],
    errors: [usersError, memberError],
    permissions,
  })
);

export type DivisionEditRouterState =
  | (BaseRouterState & {
      fromShow: boolean;
    })
  | undefined;

const rules = {} as const;

const Container: FC<
  RouteComponentProps<MemberPath, StaticContext, DivisionEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || divisionsPath;
  const onBack: ChildProps['onBack'] = useCallback(() => push(backPath), [
    push,
    backPath,
  ]);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    const reset = true;
    dispatch(usersActions.fetchEntitiesIfNeeded({ pathParams, reset }));
    dispatch(membersActions.fetchEntityIfNeeded({ pathParams, reset }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        membersActions.mergeEntity({ pathParams, bodyParams })
      );
      if (membersActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const { member, ...otherState } = useStoreSelector(selector);

  const fromShow = location.state?.fromShow;
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(membersActions.removeEntity({ pathParams }));
    if (membersActions.removeEntity.fulfilled.match(action)) {
      if (fromShow) {
        push(divisionsPath);
      } else {
        onBack();
      }
    }
    return action;
  }, [dispatch, pathParams, onBack, push, fromShow]);

  const object = useMemo(() => member && objectToInputs(member, rules), [
    member,
  ]);

  return (
    <Form
      {...otherState}
      title="Edit member"
      object={object}
      member={member}
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={onDelete}
    />
  );
};

export default Container;
