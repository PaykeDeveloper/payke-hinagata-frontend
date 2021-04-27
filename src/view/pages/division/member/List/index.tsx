// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  divisionErrorSelector,
  divisionSelector,
  divisionStatusSelector,
  divisionUpdatePermissionCheckSelector,
} from 'src/store/state/domain/division/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import {
  membersSelector,
  membersStatusSelector,
  membersErrorSelector,
  memberCreatePermissionCheckSelector,
} from 'src/store/state/domain/division/members/selectors';
import { membersActions } from 'src/store/state/domain/division/members/slice';
import {
  projectsErrorSelector,
  projectsSelector,
  projectsStatusSelector,
  projectCreatePermissionCheckSelector,
  projectUpdatePermissionCheckSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { DivisionEditRouterState } from 'src/view/pages/division/division/Edit';
import {
  DivisionPath,
  divisionsPath,
  getDivisionEditPath,
  getMemberNewPath,
  getMemberEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component, { PermissionList } from './Component';

type ChildProps = ComponentProps<typeof Component>;

const permissionSelector = createSelector(
  [
    divisionUpdatePermissionCheckSelector,
    projectCreatePermissionCheckSelector,
    projectUpdatePermissionCheckSelector,
    memberCreatePermissionCheckSelector,
  ],
  (divisionUpdate, projectCreate, projectUpdate, memberCreate) =>
    ({
      divisionUpdate,
      projectCreate,
      projectUpdate,
      memberCreate,
    } as PermissionList)
);

const selector = createSelector(
  [
    divisionSelector,
    divisionStatusSelector,
    divisionErrorSelector,
    projectsSelector,
    projectsStatusSelector,
    projectsErrorSelector,
    membersSelector,
    membersStatusSelector,
    membersErrorSelector,
    permissionSelector,
  ],
  (
    division,
    divisionStatus,
    divisionError,
    projects,
    projectsStatus,
    projectsError,
    members,
    membersStatus,
    membersError,
    permission
  ) => ({
    division,
    divisionStatus,
    projects,
    projectsStatus,
    members,
    membersStatus,
    errors: [divisionError, projectsError, membersError],
    permission,
  })
);

const Show: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
  const {
    history: { push },
    match: { params: pathParams },
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
    dispatch(divisionsActions.fetchEntityIfNeeded({ pathParams, reset }));
    dispatch(projectsActions.fetchEntitiesIfNeeded({ pathParams, reset }));
    dispatch(membersActions.fetchEntitiesIfNeeded({ pathParams, reset }));
  }, [dispatch, pathParams]);

  const path = joinString(location.pathname, location.search);

  const onClickEditDivision: ChildProps['onClickEditDivision'] = useCallback(
    () =>
      push(getDivisionEditPath(pathParams), {
        path,
        fromShow: true,
      } as DivisionEditRouterState),
    [push, pathParams, path]
  );

  const state = useStoreSelector(selector);

  const onClickAddMember: ChildProps['onClickAddMember'] = useCallback(
    () =>
      push(getMemberNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEditMember: ChildProps['onClickEditMember'] = useCallback(
    (memberId) =>
      push(getMemberEditPath({ ...pathParams, memberId }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  return (
    <Component
      {...state}
      onBack={onBack}
      onClickEditDivision={onClickEditDivision}
      onClickAddMember={onClickAddMember}
      onClickEditMember={onClickEditMember}
    />
  );
};

export default Show;
