// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  divisionProjectsErrorSelector,
  divisionProjectsSelector,
  divisionProjectsStatusSelector,
} from 'src/store/state/domain/sample/divisionProjects/selectors';
import { divisionProjectsActions } from 'src/store/state/domain/sample/divisionProjects/slice';
import {
  divisionErrorSelector,
  divisionSelector,
  divisionStatusSelector,
} from 'src/store/state/domain/sample/divisions/selectors';
import { divisionsActions } from 'src/store/state/domain/sample/divisions/slice';
import { DivisionEditRouterState } from 'src/view/pages/sample/division/Edit';
import {
  DivisionPath,
  divisionsPath,
  getDivisionProjectEditPath,
  getDivisionProjectNewPath,
  getDivisionEditPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    divisionSelector,
    divisionStatusSelector,
    divisionErrorSelector,
    divisionProjectsSelector,
    divisionProjectsStatusSelector,
    divisionProjectsErrorSelector,
  ],
  (
    division,
    divisionStatus,
    divisionError,
    divisionProjects,
    divisionProjectsStatus,
    divisionProjectsError
  ) => ({
    division,
    divisionStatus,
    divisionProjects,
    divisionProjectsStatus,
    errors: [divisionError, divisionProjectsError],
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

  const onClickAddDivisionProject: ChildProps['onClickAddDivisionProject'] = useCallback(
    () =>
      push(getDivisionProjectNewPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickEditDivisionProject: ChildProps['onClickEditDivisionProject'] = useCallback(
    (projectId) =>
      push(getDivisionProjectEditPath({ ...pathParams, projectId }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  return (
    <Component
      {...state}
      onBack={onBack}
      onClickEditDivision={onClickEditDivision}
      onClickAddDivisionProject={onClickAddDivisionProject}
      onClickEditDivisionProject={onClickEditDivisionProject}
    />
  );
};

export default Show;
