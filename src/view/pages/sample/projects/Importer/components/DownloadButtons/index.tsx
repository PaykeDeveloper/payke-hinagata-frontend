// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { parseCSV } from 'src/base/csvParser';
import { toCamelCaseKeys } from 'src/base/utils';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import {
  uploadProjectMetasSelector,
  uploadProjectsSelector,
} from 'src/store/state/ui/upload/sample/projects/selectors';
import { uploadProjectsActions } from 'src/store/state/ui/upload/sample/projects/slice';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadMethods, UploadStatus } from 'src/store/types';
import { exportToCsv } from 'src/view/base/utils';
import { DivisionPath, getProjectsPath } from 'src/view/routes/paths';
import Component from './Component';

type ChildProps = ComponentProps<typeof Component>;

export const MAX_FILE_SIZE = 1024 * 1024;
export const SUPPORTED_FORMATS = ['text/csv'];

const selector = createSelector(
  [uploadProjectsSelector, uploadProjectMetasSelector],
  (rows, metas) => ({ rows, metas })
);

const DownloadButtons: FC<{ divisionPath: DivisionPath }> = (props) => {
  const pathParams = props.divisionPath;
  const { push } = useHistory();

  const onBack: ChildProps['onBack'] = useCallback(
    () => push(getProjectsPath(pathParams)),
    [push, pathParams]
  );

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useStoreDispatch();

  const onAddCsv: ChildProps['onAddCsv'] = useCallback(
    async (value) => {
      if (!value) {
        return;
      }
      if (!SUPPORTED_FORMATS.includes(value.type)) {
        enqueueSnackbar(<Trans>Unsupported Format</Trans>, {
          variant: 'error',
        });
        return;
      }
      if (value.size > MAX_FILE_SIZE) {
        enqueueSnackbar(<Trans>File too large</Trans>, {
          variant: 'error',
        });
        return;
      }
      const data = await parseCSV(value);
      const rows = toCamelCaseKeys<UploadProjectInput[]>(data);
      dispatch(uploadProjectsActions.addRows({ rows }));
    },
    [dispatch, enqueueSnackbar]
  );

  const methods = useMemo<UploadMethods<UploadProjectInput>>(
    () => ({
      addMethod: async (dis, bodyParams) => {
        const action = await dis(
          projectsActions.addEntity({ pathParams, bodyParams })
        );
        if (projectsActions.addEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
      mergeMethod: async (dis, bodyParams) => {
        const projectSlug = `${bodyParams.slug}`;
        const action = await dis(
          projectsActions.mergeEntity({
            pathParams: { ...pathParams, projectSlug },
            bodyParams,
          })
        );
        if (projectsActions.addEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
      removeMethod: async (dis, bodyParams) => {
        const projectSlug = `${bodyParams.slug}`;
        const action = await dis(
          projectsActions.removeEntity({
            pathParams: { ...pathParams, projectSlug },
          })
        );
        if (projectsActions.addEntity.rejected.match(action)) {
          return { status: UploadStatus.Failed, error: action.payload || null };
        }
        return { status: UploadStatus.Done, error: null };
      },
    }),
    [pathParams]
  );

  const onStartUpload: ChildProps['onStartUpload'] = useCallback(async () => {
    await dispatch(uploadProjectsActions.uploadInitialRows(methods));
    enqueueSnackbar(<Trans>finished import</Trans>, {
      variant: 'success',
    });
  }, [dispatch, methods, enqueueSnackbar]);

  const onReset: ChildProps['onReset'] = useCallback(async () => {
    dispatch(uploadProjectsActions.reset());
  }, [dispatch]);

  const { rows, metas } = useStoreSelector(selector);

  const errorRows = useMemo(
    () =>
      rows.filter((row, index) => metas[index]?.status === UploadStatus.Failed),
    [metas, rows]
  );
  const onDownloadErrors: ChildProps['onDownloadErrors'] =
    useCallback(async () => {
      exportToCsv(errorRows, 'errors.csv');
    }, [errorRows]);

  const hasInitial =
    metas.filter((meta) => meta.status === UploadStatus.Initial).length > 0;

  const hasWaiting =
    metas.filter((meta) => meta.status === UploadStatus.Waiting).length > 0;

  const hasUploading =
    metas.filter((meta) => meta.status === UploadStatus.Uploading).length > 0;

  const onStopUpload: ChildProps['onStopUpload'] = async () =>
    dispatch(uploadProjectsActions.setRowsWaitingToStopped());

  return (
    <Component
      onBack={onBack}
      onAddCsv={onAddCsv}
      onStartUpload={
        hasInitial && !hasWaiting && !hasUploading ? onStartUpload : undefined
      }
      onStopUpload={hasWaiting ? onStopUpload : undefined}
      onReset={!hasWaiting && !hasUploading ? onReset : undefined}
      onDownloadErrors={errorRows.length > 0 ? onDownloadErrors : undefined}
    />
  );
};

export default DownloadButtons;
