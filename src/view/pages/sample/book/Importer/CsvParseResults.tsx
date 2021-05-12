// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import {
  importResultSelector,
  finishedRowsSelector,
  totalRowsSelector,
} from 'src/store/state/ui/sample/importers/books/selectors';
import {
  BookImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/importers/books/types';
import { StoreStatus } from 'src/store/types';
import {
  getErrorMessage,
  isStoreError,
  isUnprocessableEntityError,
} from 'src/store/utils';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import {
  SaveIcon,
  DeleteIcon,
  DownloadIcon,
  BlockIcon,
  CheckIcon,
} from 'src/view/base/material-ui/Icon';
import Buttons from 'src/view/components/molecules/Buttons';
import FileUploadButton from './Components/FileUploadButton';

const progressSelector = createSelector(
  [finishedRowsSelector, totalRowsSelector],
  (finished, total) => ({
    finished,
    total,
  })
);

const ImportProgress: FC<{
  status: StoreStatus;
}> = (props) => {
  const { status } = props;
  const state = useStoreSelector(progressSelector);
  const { total, finished } = state;
  let progress: number | undefined = undefined;
  if (status !== StoreStatus.Initial) {
    if (finished === 0) {
      progress = 1;
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

export const CsvParseResults: FC<{
  onStartImport: () => void;
  onReset: () => void;
  onDownloadErrors: () => void;
  onInputChange: (value?: File) => void | Promise<unknown>;
  importers: BookImporter[];
  status: StoreStatus;
}> = (props) => {
  const {
    onStartImport,
    onReset,
    onDownloadErrors,
    onInputChange,
    status,
    importers,
    ...otherProps
  } = props;
  const { t } = useTranslation();
  return (
    <Box mt={3}>
      <Typography variant="h5">{t('Import Rows')}</Typography>
      <Box mt={1}>
        <Buttons
          leftButtons={[
            <FileUploadButton
              color="primary"
              onInputChange={onInputChange}
              disabled={importers.length !== 0}
              accept={'text/csv'}
            >
              {t('Parse Csv')}
            </FileUploadButton>,
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={onStartImport}
              disabled={
                importers.length === 0 || status !== StoreStatus.Initial
              }
            >
              {t('Start Import')}
            </Button>,
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<DeleteIcon />}
              onClick={onReset}
              disabled={
                importers.length === 0 || status === StoreStatus.Started
              }
            >
              {t('Clear')}
            </Button>,
            <Button
              type="button"
              variant="contained"
              color="default"
              size="large"
              startIcon={<DownloadIcon />}
              onClick={onDownloadErrors}
              disabled={status !== StoreStatus.Done}
            >
              {t('Download Error Rows')}
            </Button>,
          ]}
        />
        <ImportersTable {...otherProps} importers={importers} status={status} />
      </Box>
    </Box>
  );
};

const StatusCell: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultSelector(s, rowId));
  if (result?.status === ImportStatus.Preparing) {
    return <CircularProgress />;
  } else if (result?.status === ImportStatus.Success) {
    return <CheckIcon color="primary" />;
  } else if (result?.status === ImportStatus.Failed) {
    return <BlockIcon color="error" />;
  }
  return <></>;
};

const ErrorCell: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultSelector(s, rowId));
  let message = '';
  if (result?.status === ImportStatus.Failed && result?.error !== undefined) {
    const error = result.error;
    if (isUnprocessableEntityError(error)) {
      const errors: object = error.data?.errors ?? {};
      Object.entries(errors).forEach(([key, error]) =>
        error.forEach((errorMessage: string) => {
          message += errorMessage;
        })
      );
    } else if (isStoreError(error)) {
      message = getErrorMessage(error);
    }
  }
  return (
    <Typography variant="body2" color="error" noWrap>
      {message}
    </Typography>
  );
};

const ImportersTable: FC<{
  importers: BookImporter[];
  status: StoreStatus;
}> = (props) => {
  const { importers, status } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      type: 'number',
      flex: 0.5,
      renderCell: ({ row }) => {
        return <StatusCell rowId={row['id'].toString()} />;
      },
    },
    {
      field: 'book_id',
      flex: 0.5,
      valueGetter: (params: GridValueGetterParams) => params.row.book.id,
    },
    {
      field: 'title',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.book.title,
    },
    {
      field: 'author',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.book.author,
    },
    {
      field: 'releaseDate',
      headerName: t('Release date'),
      type: 'date',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.book.releaseDate,
    },
    {
      field: 'errorMessage',
      headerName: t('error message'),
      flex: 3,
      renderCell: ({ row }) => {
        return <ErrorCell rowId={row['id'].toString()} />;
      },
    },
  ];
  return (
    <Box mt={3}>
      <RouterDataGrid
        columns={columns}
        rows={importers}
        disableColumnMenu
        disableColumnSelector
        disableColumnReorder
        disableExtendRowFullWidth
        disableSelectionOnClick
        loading
        pagination
        autoPageSize={false}
        pageSize={25}
        rowsPerPageOptions={[5, 25, 50]}
        components={{
          LoadingOverlay: () => (
            <GridOverlay>
              <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <ImportProgress status={status} />
              </div>
            </GridOverlay>
          ),
        }}
      />
    </Box>
  );
};
