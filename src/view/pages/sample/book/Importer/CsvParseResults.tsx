// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import { importResultSelector } from 'src/store/state/ui/sample/books/selectors';
import {
  BookImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/books/types';
import {
  getErrorMessage,
  isStoreError,
  isUnprocessableEntityError,
} from 'src/store/utils';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import { BlockIcon, CheckIcon } from 'src/view/base/material-ui/Icon';
export const CsvParseResults: FC<{
  onStartImport: () => void;
  onReset: () => void;
  onDownloadErrors: () => void;
  importers: BookImporter[];
}> = (props) => {
  console.log('render CsvParseResults');
  const { onStartImport, onReset, onDownloadErrors, ...otherProps } = props;
  const { t } = useTranslation();
  return (
    <Box mt={3}>
      <Card>
        <CardActions>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="small"
            onClick={onStartImport}
          >
            {t('Start Import')}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="small"
            onClick={onReset}
          >
            {t('Clean')}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="small"
            onClick={onDownloadErrors}
          >
            {t('Error Rows Download')}
          </Button>
        </CardActions>
        <CardContent>
          <ImportersTable {...otherProps} />
        </CardContent>
      </Card>
    </Box>
  );
};

const StatusCell: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultSelector(s, rowId));
  if (result?.status === ImportStatus.Prepareing) {
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
  if (result?.status === ImportStatus.Failed && result?.error !== undefined) {
    const error = result.error;
    if (isUnprocessableEntityError(error)) {
      const errors: object = error.data?.errors ?? {};
      let message = '';
      Object.entries(errors).forEach(([key, error]) =>
        error.forEach((value: any) => {
          message += value;
        })
      );
      return <Typography color="error">{message}</Typography>;
    }
    if (isStoreError(error)) {
      const message = getErrorMessage(error);
      return <Typography color="error">{message}</Typography>;
    }
  }
  return <></>;
};

const ImportersTable: FC<{
  importers: BookImporter[];
}> = (props) => {
  const { importers } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      type: 'number',
      renderCell: ({ row }) => {
        return <StatusCell rowId={row['id'].toString()} />;
      },
    },
    {
      field: 'book_id',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.book.id,
    },
    {
      field: 'title',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.book.title,
    },
    {
      field: 'author',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.book.author,
    },
    {
      field: 'releaseDate',
      headerName: t('Release date'),
      type: 'date',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.book.releaseDate,
    },
    {
      field: 'errorMessage',
      headerName: t('error message'),
      width: 250,
      renderCell: ({ row }) => {
        return <ErrorCell rowId={row['id'].toString()} />;
      },
    },
  ];
  return (
    <Box mt={1}>
      <RouterDataGrid
        columns={columns}
        rows={importers}
        pageSize={20}
        disableColumnMenu
        disableColumnSelector
        disableExtendRowFullWidth
        disableSelectionOnClick
      />
    </Box>
  );
};
