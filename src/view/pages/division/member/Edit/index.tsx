// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { memberRolesSelector } from 'src/store/state/domain/common/roles/selectors';
import { usersSelector } from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
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
    checkUpdateMemberSelector,
    checkDeleteMemberSelector,
  ],
  (object, status, error, users, roles, checkUpdate, checkDelete) => ({
    object,
    status,
    error,
    users,
    roles,
    canUpdate: checkUpdate(object?.id),
    canDelete: checkDelete(object?.id),
  })
);

export type DivisionEditRouterState =
  | (BaseRouterState & {
      fromShow: boolean;
    })
  | undefined;

const Edit: FC<
  RouteComponentProps<MemberPath, StaticContext, DivisionEditRouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;

  const backPath = location.state?.path || divisionsPath;
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams }));
    dispatch(usersActions.fetchEntitiesIfNeeded({ pathParams }));
    dispatch(membersActions.fetchEntityIfNeeded({ pathParams }));
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

  const { canUpdate, canDelete, ...otherState } = useStoreSelector(selector);

  return (
    <Form
      {...otherState}
      divisionPath={pathParams}
      title="Edit member"
      disabled={!canUpdate}
      onSubmit={onSubmit}
      onBack={onBack}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Edit;
