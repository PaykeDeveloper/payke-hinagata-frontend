// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';

import { divisionsActions } from 'src/store/state/domain/division/divisions/slice';
import {
  canDeleteProjectSelector,
  canUpdateProjectSelector,
  projectErrorSelector,
  projectSelector,
  projectStatusSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { ProjectPath, getProjectsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    projectSelector,
    projectStatusSelector,
    projectErrorSelector,
    canUpdateProjectSelector,
    canDeleteProjectSelector,
  ],
  (object, status, error, canUpdate, canDelete) => ({
    object,
    status,
    error,
    canUpdate,
    canDelete,
  })
);

const rules = {} as const;

const Container: FC<
  RouteComponentProps<ProjectPath, StaticContext, RouterState>
> = (props) => {
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
    dispatch(projectsActions.fetchEntityIfNeeded({ pathParams, reset: true }));
  }, [dispatch, pathParams]);

  const onSubmit: ChildProps['onSubmit'] = useCallback(
    async (params) => {
      const action = await dispatch(
        projectsActions.mergeEntity({
          pathParams,
          bodyParams: inputsToObject(params, rules),
          useFormData: true,
        })
      );
      if (projectsActions.mergeEntity.fulfilled.match(action)) {
        onBack();
      }
      return action;
    },
    [dispatch, pathParams, onBack]
  );

  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(projectsActions.removeEntity({ pathParams }));
    if (projectsActions.removeEntity.fulfilled.match(action)) {
      onBack();
    }
    return action;
  }, [dispatch, pathParams, onBack]);

  const { canUpdate, canDelete, ...otherState } = useStoreSelector(selector);

  console.log(pathParams);
  return (
    <Form
      {...otherState}
      title="Edit project"
      disabled={!canUpdate}
      divisionPath={pathParams}
      onSubmit={onSubmit}
      onDelete={canDelete ? onDelete : undefined}
      onBack={onBack}
    />
  );
};

export default Container;