// FIXME: SAMPLE CODE

import React, { FC, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import {
  canViewProjectsSelector,
  projectsStatusSelector,
} from 'src/store/state/domain/sample/projects/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { checkProcessed } from 'src/store/utils';
import { ProjectPath } from 'src/view/routes/paths';

type Props = {
  params: Partial<ProjectPath>;
};

const selector = createSelector(
  [projectsStatusSelector, canViewProjectsSelector],
  (status, canView) => ({
    processed: checkProcessed(status),
    canView,
  })
);

const {
  fetchEntitiesIfNeeded,
  fetchEntityIfNeeded,
  resetEntitiesIfNeeded,
  resetEntityIfNeeded,
} = projectsActions;

const SyncProjects: FC<Props> = (props) => {
  const {
    params: { divisionId, projectSlug },
    children,
  } = props;
  const { processed, canView } = useStoreSelector(selector);
  const dispatch = useStoreDispatch();
  useEffect(() => {
    if (canView && divisionId) {
      dispatch(
        fetchEntitiesIfNeeded({ pathParams: { divisionId }, reset: true })
      );
    } else {
      dispatch(resetEntitiesIfNeeded());
    }
  }, [dispatch, canView, divisionId]);

  useEffect(() => {
    if (processed && canView && divisionId && projectSlug) {
      dispatch(
        fetchEntityIfNeeded({
          pathParams: { divisionId, projectSlug },
          reset: true,
        })
      );
    } else {
      dispatch(resetEntityIfNeeded());
    }
  }, [dispatch, processed, canView, divisionId, projectSlug]);

  return <>{children}</>;
};

export default SyncProjects;
