// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import {
  projectsErrorSelector,
  projectsSelector,
  projectsStatusSelector,
  canCreateProjectSelector,
  canEditProjectSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import {
  DivisionPath,
  getProjectEditPath,
  getProjectNewPath,
} from 'src/view/routes/paths';
import { RouterState } from 'src/view/routes/types';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

const selector = createSelector(
  [
    projectsSelector,
    projectsStatusSelector,
    projectsErrorSelector,
    canCreateProjectSelector,
    canEditProjectSelector,
  ],
  (projects, status, error, canCreate, canEdit) => ({
    projects,
    status,
    error,
    canCreate,
    canEdit,
  })
);

const Show: FC<RouteComponentProps<DivisionPath, StaticContext, RouterState>> =
  (props) => {
    const {
      history: { push },
      match: { params: pathParams },
      location,
    } = props;

    const path = joinString(location.pathname, location.search);

    const onClickAdd: ChildProps['onClickAdd'] = useCallback(
      () =>
        push(getProjectNewPath(pathParams), {
          path,
        } as RouterState),
      [push, pathParams, path]
    );

    const onClickEdit: ChildProps['onClickEdit'] = useCallback(
      (projectId) =>
        push(getProjectEditPath({ ...pathParams, projectId }), {
          path,
        } as RouterState),
      [push, pathParams, path]
    );

    const { canCreate, canEdit, ...otherState } = useStoreSelector(selector);

    return (
      <Component
        {...otherState}
        onClickAdd={canCreate ? onClickAdd : undefined}
        onClickEdit={canEdit ? onClickEdit : undefined}
      />
    );
  };

export default Show;
