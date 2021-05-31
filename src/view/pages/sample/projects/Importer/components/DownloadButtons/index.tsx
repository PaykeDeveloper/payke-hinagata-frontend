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
  uploadProjectRowsSelector,
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
  [uploadProjectRowsSelector, uploadProjectMetasSelector],
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
      const dataList = toCamelCaseKeys<UploadProjectInput[]>(data);
      dispatch(uploadProjectsActions.addRows({ dataList }));
    },
    [dispatch, enqueueSnackbar]
  );

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

  const onStartUpload: ChildProps['onStartUpload'] = useCallback(async () => {
    await dispatch(uploadProjectsActions.uploadInitialRows(methods));
    enqueueSnackbar(<Trans>finished import</Trans>, {
      variant: 'success',
    });
  }, [dispatch, methods, enqueueSnackbar]);

  const onClear: ChildProps['onClear'] = useCallback(
    async () => dispatch(uploadProjectsActions.reset()),
    [dispatch]
  );

  const { rows, metas } = useStoreSelector(selector);

  const errorDataList = useMemo(
    () =>
      rows
        .filter(({ id }) => metas[id]?.status === UploadStatus.Failed)
        .map(({ data }) => data),
    [metas, rows]
  );
  const onDownloadErrors: ChildProps['onDownloadErrors'] =
    useCallback(async () => {
      exportToCsv(errorDataList, 'errors.csv');
    }, [errorDataList]);

  const statuses = useMemo(
    () =>
      rows.reduce((result, row) => {
        const status = metas[row.id]?.status;
        if (status !== undefined) {
          if (result[status] === undefined) {
            result[status] = 0;
          }
          result[status] += 1;
        }
        return result;
      }, {} as Record<UploadStatus, number>),
    [metas, rows]
  );

  const onStopUpload: ChildProps['onStopUpload'] = useCallback(
    async () => dispatch(uploadProjectsActions.stopWaitingRows()),
    [dispatch]
  );

  const processing =
    statuses[UploadStatus.Waiting] || statuses[UploadStatus.Uploading];

  const finished = statuses[UploadStatus.Done] || statuses[UploadStatus.Failed];

  return (
    <Component
      onBack={onBack}
      onAddCsv={!processing && !finished ? onAddCsv : undefined}
      onStartUpload={
        statuses[UploadStatus.Initial] && !processing
          ? onStartUpload
          : undefined
      }
      onStopUpload={statuses[UploadStatus.Waiting] ? onStopUpload : undefined}
      onClear={rows.length > 0 && !processing ? onClear : undefined}
      onDownloadErrors={errorDataList.length > 0 ? onDownloadErrors : undefined}
    />
  );
};

export default DownloadButtons;
