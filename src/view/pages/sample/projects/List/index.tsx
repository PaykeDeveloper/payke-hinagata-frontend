// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { joinString } from 'src/base/utils';
import { useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import {
  projectsErrorSelector,
  projectsSelector,
  projectsStatusSelector,
  canCreateProjectSelector,
  canEditProjectSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { getProjectsExportApiUrl } from 'src/store/urls';
import {
  DivisionPath,
  getProjectEditPath,
  getProjectImportPath,
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
    divisionSelector,
    canCreateProjectSelector,
    canEditProjectSelector,
  ],
  (projects, status, error, division, canCreate, canEdit) => ({
    projects,
    status,
    error,
    division,
    canCreate,
    canEdit,
  })
);

const Container: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
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
    (projectSlug) =>
      push(getProjectEditPath({ ...pathParams, projectSlug }), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const onClickImport: ChildProps['onClickImport'] = useCallback(
    () =>
      push(getProjectImportPath(pathParams), {
        path,
      } as RouterState),
    [push, pathParams, path]
  );

  const { canCreate, canEdit, ...otherState } = useStoreSelector(selector);

  return (
    <Component
      {...otherState}
      exportUrl={getProjectsExportApiUrl(pathParams)}
      onClickAdd={canCreate ? onClickAdd : undefined}
      onClickEdit={canEdit ? onClickEdit : undefined}
      onClickImport={canCreate ? onClickImport : undefined}
    />
  );
};

export default Container;
