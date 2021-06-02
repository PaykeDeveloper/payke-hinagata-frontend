// FIXME: SAMPLE CODE

import React, { FC, useEffect, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import {
  uploadProjectKeySelector,
  uploadProjectMetasSelector,
  uploadProjectRowsSelector,
} from 'src/store/state/ui/upload/sample/projects/selectors';
import { uploadProjectsActions } from 'src/store/state/ui/upload/sample/projects/slice';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadMethods, UploadStatus } from 'src/store/types';
import { uploadProcessingStatuses } from 'src/store/utils';
import { DivisionPath } from 'src/view/routes/paths';
import Component from './Component';

const selector = createSelector(
  [
    divisionSelector,
    uploadProjectRowsSelector,
    uploadProjectMetasSelector,
    uploadProjectKeySelector,
  ],
  (division, rows, metas, key) => {
    const processing = !!rows.find((row) => {
      const status = metas[row.id]?.status;
      return status !== undefined && uploadProcessingStatuses.includes(status);
    });
    return { division, processing, key };
  }
);

const Upload: FC<RouteComponentProps<DivisionPath>> = (props) => {
  const {
    match: { params: pathParams },
    location: { pathname },
  } = props;

  const dispatch = useStoreDispatch();
  const methods = useMemo<UploadMethods<UploadProjectInput>>(
    () => ({
      addMethod: async (bodyParams) => {
        const action = await dispatch(
          projectsActions.addEntity({ pathParams, bodyParams })
        );
        if (projectsActions.addEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
      mergeMethod: async (bodyParams) => {
        const projectSlug = `${bodyParams.slug}`;
        const action = await dispatch(
          projectsActions.mergeEntity({
            pathParams: { ...pathParams, projectSlug },
            bodyParams,
          })
        );
        if (projectsActions.mergeEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
      removeMethod: async (bodyParams) => {
        const projectSlug = `${bodyParams.slug}`;
        const action = await dispatch(
          projectsActions.removeEntity({
            pathParams: { ...pathParams, projectSlug },
          })
        );
        if (projectsActions.removeEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
    }),
    [dispatch, pathParams]
  );

  const { processing, key, ...otherState } = useStoreSelector(selector);

  const notSameKey = key !== pathname;

  useEffect(() => {
    if (!processing && notSameKey) {
      dispatch(uploadProjectsActions.initialize({ key: pathname }));
    }
  }, [dispatch, processing, notSameKey, pathname]);

  return (
    <Component
      {...otherState}
      pathname={pathname}
      divisionPath={pathParams}
      methods={methods}
      disabled={processing && notSameKey}
    />
  );
};

export default Upload;
