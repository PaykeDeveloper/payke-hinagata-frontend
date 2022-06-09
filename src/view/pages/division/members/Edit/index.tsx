// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { memberRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import { usersSelector } from 'src/store/state/domain/common/users/selectors';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  checkDeleteMemberSelector,
  checkUpdateMemberSelector,
} from 'src/store/state/domain/division/members/selectors';
import {
  memberErrorSelector,
  memberSelector,
  memberStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import { MemberPath, divisionsPath } from 'src/view/routes/paths';
import { BaseRouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    memberSelector,
    memberStatusSelector,
    memberErrorSelector,
    usersSelector,
    memberRolesSelector,
    divisionSelector,
    checkUpdateMemberSelector,
    checkDeleteMemberSelector,
  ],
  (
    object,
    status,
    error,
    users,
    roles,
    division,
    checkUpdate,
    checkDelete
  ) => ({
    object,
    status,
    error,
    users,
    roles,
    division,
    canUpdate: checkUpdate(object?.id),
    canDelete: checkDelete(object?.id),
  })
);

export type DivisionEditRouterState = BaseRouterState | undefined;

const Edit: FC<
  RouteComponentProps<MemberPath, StaticContext, DivisionEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backTo = location.state?.path || divisionsPath;

  const dispatch = useStoreDispatch();

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        membersActions.mergeEntity({ pathParams, bodyParams })
      );
      if (membersActions.mergeEntity.fulfilled.match(action)) {
        push(backTo);
      }
      return action;
    },
    [backTo, dispatch, pathParams, push]
  );

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(membersActions.removeEntity({ pathParams }));
    if (membersActions.removeEntity.fulfilled.match(action)) {
      push(backTo);
    }
    return action;
  }, [dispatch, pathParams, push, backTo]);

  const { canUpdate, canDelete, ...otherState } = useStoreSelector(selector);

  return (
    <Form
      {...otherState}
      divisionPath={pathParams}
      title="Edit member"
      disabled={!canUpdate}
      backTo={backTo}
      onSubmit={onSubmit}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Edit;
