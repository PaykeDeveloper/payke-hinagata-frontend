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
  canCreateMemberSelector,
  membersErrorSelector,
  membersStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import { DivisionPath, getProjectsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    membersStatusSelector,
    membersErrorSelector,
    usersSelector,
    memberRolesSelector,
    canCreateMemberSelector,
  ],
  (status, error, users, roles, canCreate) => ({
    status,
    error,
    users,
    roles,
    canCreate,
  })
);

const New: FC<RouteComponentProps<DivisionPath, StaticContext, RouterState>> = (
  props
) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backPath = location.state?.path || getProjectsPath(pathParams);
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams }));
    dispatch(usersActions.fetchEntitiesIfNeeded({ pathParams }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (bodyParams) => {
      const action = await dispatch(
        membersActions.addEntity({ pathParams, bodyParams })
      );
      if (membersActions.addEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);

  return (
    <Form
      {...otherState}
      title="Add member"
      object={undefined}
      disabled={!canCreate}
      divisionPath={pathParams}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default New;
