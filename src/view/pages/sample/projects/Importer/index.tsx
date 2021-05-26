// FIXME: SAMPLE CODE

import React, { ComponentProps, FC, useCallback } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createSelector } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { Trans } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import { projectsActions } from 'src/store/state/domain/sample/projects/slice';
import { ProjectInput } from 'src/store/state/domain/sample/projects/types';
import {
  importRowsSelector,
  filterErrorImporters,
  importerStatusSelector,
  finishedRowsSelector,
  totalRowsSelector,
} from 'src/store/state/ui/sample/importers/projects/selectors';
import { projectImportersActions } from 'src/store/state/ui/sample/importers/projects/slice';
import { StoreStatus } from 'src/store/types';
import { readCsv, exportToCsv } from 'src/store/utils/csvParser';
import Component from 'src/view/pages/sample/projects/Importer/Component';
import { DivisionPath, getProjectsPath } from 'src/view/routes/paths';

const selector = createSelector(
  [divisionSelector, importRowsSelector, importerStatusSelector],
  (division, importers, status) => ({
    division,
    importers,
    status,
  })
);

const progressSelector = createSelector(
  [importerStatusSelector, finishedRowsSelector, totalRowsSelector],
  (status, finished, total) => ({
    status,
    finished,
    total,
  })
);

const ImportProgress: FC = () => {
  const state = useStoreSelector(progressSelector);
  const { status, total, finished } = state;
  let progress: number | undefined;
  if (status !== StoreStatus.Initial) {
    if (finished === 0) {
      progress = 0.01;
    } else {
      progress = (finished! / total!) * 100;
    }
  } else {
    progress = undefined;
  }
  if (progress) {
    return <LinearProgress variant="determinate" value={progress} />;
  } else {
    return <></>;
  }
};

export const MAX_FILE_SIZE = 1024 * 1024;
export const SUPPORTED_FORMATS = ['text/csv'];

type ChildProps = ComponentProps<typeof Component>;

const Importer: FC<RouteComponentProps<DivisionPath>> = (props) => {
  const {
    match: { params: pathParams },
    history: { push },
  } = props;

  const onBack: ChildProps['onBack'] = useCallback(
    () => push(getProjectsPath(pathParams)),
    [push, pathParams]
  );

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useStoreDispatch();
  const state = useStoreSelector(selector);
  const { status, ...otherState } = state;
  const handleSetCsvFile: ChildProps['onInputChange'] = useCallback(
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
      const data = await readCsv<ProjectInput>(value);
      dispatch(projectImportersActions.setImporters(data));
    },
    [dispatch, enqueueSnackbar]
  );
  const handleImport: ChildProps['onStartImport'] = useCallback(async () => {
    try {
      await dispatch(projectImportersActions.startImport(pathParams));
    } finally {
      enqueueSnackbar(<Trans>finished import</Trans>, {
        variant: 'success',
      });
      dispatch(projectsActions.fetchEntities({ pathParams }));
    }
  }, [dispatch, pathParams, enqueueSnackbar]);
  const handleClear: ChildProps['onReset'] = useCallback(async () => {
    dispatch(projectImportersActions.resetImporters());
  }, [dispatch]);
  const errorResults = useStoreSelector(filterErrorImporters);
  const handlerDownloadErrors: ChildProps['onDownloadErrors'] =
    useCallback(async () => {
      exportToCsv(
        'errors.csv',
        errorResults.map((result) => {
          return {
            project_id: result.project.id ?? '',
            division_id: result.project.divisionId ?? '',
            name: result.project.name ?? '',
          };
        })
      );
    }, [errorResults]);
  return (
    <Component
      {...otherState}
      status={status}
      divisionPath={pathParams}
      onBack={onBack}
      onStartImport={handleImport}
      onReset={handleClear}
      onDownloadErrors={handlerDownloadErrors}
      onInputChange={handleSetCsvFile}
    >
      <ImportProgress />
    </Component>
  );
};

export default Importer;
