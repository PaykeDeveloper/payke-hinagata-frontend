// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { divisionMembersActions } from 'src/store/state/domain/sample/divisionMembers/slice';
import { divisionProjectsActions } from 'src/store/state/domain/sample/divisionProjects/slice';
import {
  divisionErrorSelector,
  divisionSelector,
  divisionStatusSelector,
  divisionUpdatePermissionCheckSelector,
} from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import { DivisionEditRouterState } from 'src/view/pages/sample/division/Edit';
import {
  DivisionPath,
  divisionsPath,
  getDivisionEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component, { PermissionList } from './Component';

type ChildProps = ComponentProps<typeof Component>;

const permissionSelector = createSelector(
  [divisionUpdatePermissionCheckSelector],
  (divisionUpdate) =>
    ({
      divisionUpdate,
    } as PermissionList)
);

const selector = createSelector(
  [
    divisionSelector,
    divisionStatusSelector,
    divisionErrorSelector,
    permissionSelector,
  ],
  (division, divisionStatus, divisionError, permission) => ({
    division,
    divisionStatus,
    errors: [divisionError],
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
    dispatch(
      divisionProjectsActions.fetchEntitiesIfNeeded({ pathParams, reset })
    );
    dispatch(
      divisionMembersActions.fetchEntitiesIfNeeded({ pathParams, reset })
    );
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

  return (
    <Component
      {...state}
      onBack={onBack}
      onClickEditDivision={onClickEditDivision}
    />
  );
};

export default Show;
