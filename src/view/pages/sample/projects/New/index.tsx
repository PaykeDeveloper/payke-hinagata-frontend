// FIXME: SAMPLE CODE

import { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { inputsToObject } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  canCreateProjectSelector,
  projectsErrorSelector,
  projectsStatusSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { DivisionPath, getProjectsPath } from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Form from '../components/Form';

type ChildProps = ComponentProps<typeof Form>;

const selector = createSelector(
  [
    projectsStatusSelector,
    projectsErrorSelector,
    divisionSelector,
    canCreateProjectSelector,
  ],
  (status, error, division, canCreate) => ({
    status,
    error,
    division,
    canCreate,
  }),
);

const Container: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
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
        projectsActions.addEntity({
          pathParams,
          bodyParams: inputsToObject(params, {}),
          useFormData: true,
        }),
      );
      if (projectsActions.addEntity.fulfilled.match(action)) {
        push(backTo);
      }
      return action;
    },
    [dispatch, pathParams, push, backTo],
  );

  const { canCreate, ...otherState } = useStoreSelector(selector);

  return (
    <Form
      {...otherState}
      title="Add project"
      object={{ approved: false }}
      disabled={!canCreate}
      divisionPath={pathParams}
      project={undefined}
      backTo={backTo}
      onSubmit={onSubmit}
    />
  );
};

export default Container;
