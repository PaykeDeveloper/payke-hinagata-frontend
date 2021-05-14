// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  memberRolesSelector,
  rolesStatusSelector,
} from 'src/store/state/domain/common/roles/selectors';
import {
  usersErrorSelector,
  usersSelector,
  usersStatusSelector,
} from 'src/store/state/domain/common/users/selectors';
import { usersActions } from 'src/store/state/domain/common/users/slice';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import {
  membersErrorSelector,
  membersStatusSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import { DivisionPath, getDivisionPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    divisionSelector,
    usersSelector,
    memberRolesSelector,
    membersStatusSelector,
    usersStatusSelector,
    rolesStatusSelector,
    membersErrorSelector,
    usersErrorSelector,
  ],
  (
    division,
    users,
    memberRoles,
    memberStatus,
    usersStatus,
    rolesStatus,
    memberError,
    usersError
  ) => ({
    division,
    statuses: [memberStatus, rolesStatus, usersStatus],
    users,
    memberRoles,
    errors: [memberError, usersError],
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
  const backPath = location.state?.path || getDivisionPath(pathParams);
  const onBack: ChildProps['onBack'] = useCallback(
    () => push(backPath),
    [push, backPath]
  );

  const dispatch = useStoreDispatch();

  useEffect(() => {
    const reset = true;
    dispatch(usersActions.fetchEntitiesIfNeeded({ pathParams, reset }));
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams, reset }));
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

  const state = useStoreSelector(selector);

  return (
    <Form
      {...state}
      title="Add member"
      object={undefined}
      member={undefined}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default New;
