// FIXME: SAMPLE CODE

import { ComponentProps, FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { Trans } from 'react-i18next';
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
  canViewProjectsSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { getProjectsDownloadApiUrl } from 'src/store/urls';
import {
  DivisionPath,
  divisionsPath,
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
    divisionSelector,
    canViewProjectsSelector,
    canCreateProjectSelector,
    canEditProjectSelector,
  ],
  (projects, status, error, division, canView, canCreate, canEdit) => ({
    projects,
    status,
    error,
    division,
    canView,
    canCreate,
    canEdit,
  })
);

const Container: FC<
  RouteComponentProps<DivisionPath, StaticContext, RouterState>
> = (props) => {
  const {
    match: { params: pathParams },
    location,
  } = props;
  const backTo = location.state?.path || divisionsPath;
  const path = joinString(location.pathname, location.search);
  const { canCreate, canEdit, ...otherState } = useStoreSelector(selector);

  const actions: ChildProps['actions'] = [
    {
      children: <Trans>Edit</Trans>,
      getTo: ({ slug }) =>
        canEdit
          ? {
              pathname: getProjectEditPath({
                ...pathParams,
                projectSlug: slug,
              }),
              state: { path } as RouterState,
            }
          : undefined,
    },
  ];
  const addTo: ChildProps['addTo'] = canCreate
    ? {
        pathname: getProjectNewPath(pathParams),
        state: { path } as RouterState,
      }
    : undefined;

  return (
    <Component
      {...otherState}
      exportUrl={getProjectsDownloadApiUrl(pathParams)}
      actions={actions}
      addTo={addTo}
      backTo={backTo}
    />
  );
};

export default Container;
