// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject, objectToInputs } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  canDeleteProjectSelector,
  canUpdateProjectSelector,
  projectErrorSelector,
  projectSelector,
  projectStatusSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { getErrorMessage } from 'src/store/utils';
import { ProjectPath, getProjectsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    projectSelector,
    projectStatusSelector,
    projectErrorSelector,
    divisionSelector,
    canUpdateProjectSelector,
    canDeleteProjectSelector,
  ],
  (project, status, error, division, canUpdate, canDelete) => ({
    project,
    status,
    error,
    division,
    canUpdate,
    canDelete,
  })
);

const rules = { finishedAt: 'dateTime' } as const;

const Container: FC<
  RouteComponentProps<ProjectPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
    location,
  } = props;
  const backTo = location.state?.path || getProjectsPath(pathParams);

  const dispatch = useStoreDispatch();

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
        push(backTo);
      }
      return action;
    },
    [dispatch, pathParams, push, backTo]
  );

  const { enqueueSnackbar } = useSnackbar();
  const onDelete: ChildProps['onDelete'] = useCallback(async () => {
    const action = await dispatch(projectsActions.removeEntity({ pathParams }));
    if (projectsActions.removeEntity.fulfilled.match(action)) {
      push(backTo);
    } else if (projectsActions.removeEntity.rejected.match(action)) {
      if (action.payload) {
        const message = getErrorMessage(action.payload);
        enqueueSnackbar(message, { variant: 'error' });
      }
    }
    return action;
  }, [dispatch, pathParams, push, backTo, enqueueSnackbar]);

  const { canUpdate, canDelete, project, ...otherState } =
    useStoreSelector(selector);

  const object = useMemo(
    () => project && objectToInputs(project, rules),
    [project]
  );

  return (
    <Form
      {...otherState}
      title="Edit project"
      object={object}
      disabled={!canUpdate}
      divisionPath={pathParams}
      project={project}
      backTo={backTo}
      onSubmit={onSubmit}
      onDelete={canDelete ? onDelete : undefined}
    />
  );
};

export default Container;
