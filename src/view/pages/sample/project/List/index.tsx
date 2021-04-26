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
  memberViewPermissionCheckSelector,
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
  getProjectEditPath,
  getProjectNewPath,
  getDivisionEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component, { PermissionList } from './Component';

type ChildProps = ComponentProps<typeof Component>;

const permissionSelector = createSelector(
  [
    divisionUpdatePermissionCheckSelector,
    projectCreatePermissionCheckSelector,
    projectUpdatePermissionCheckSelector,
    memberViewPermissionCheckSelector,
  ],
  (divisionUpdate, projectCreate, projectUpdate, memberView) =>
    ({
      divisionUpdate,
      projectCreate,
      projectUpdate,
      memberView,
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

  const onClickAddProject: ChildProps['onClickAddProject'] = useCallback(
    () =>
      push(getProjectNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEditProject: ChildProps['onClickEditProject'] = useCallback(
    (projectId) =>
      push(getProjectEditPath({ ...pathParams, projectId }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  return (
    <Component
      {...state}
      onBack={onBack}
      onClickEditDivision={onClickEditDivision}
      onClickAddProject={onClickAddProject}
      onClickEditProject={onClickEditProject}
    />
  );
};

export default Show;
