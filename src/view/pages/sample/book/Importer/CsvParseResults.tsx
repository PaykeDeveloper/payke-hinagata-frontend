import React, { FC } from 'react';
import { Box, Button, Card, CardContent, CardActions } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import { StoreState } from 'src/store';
import { bookImporterResultsSelector } from 'src/store/state/ui/sample/books/selectors';
import {
  BookImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/books/types';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import { BlockIcon, CheckIcon } from 'src/view/base/material-ui/Icon';

export const CsvParseResults: FC<{
  onStartImport: () => void;
  onReset: () => void;
  importers: BookImporter[];
}> = (props) => {
  console.log('render CsvParseResults!!');
  const { onStartImport, onReset, ...otherProps } = props;
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
        </CardActions>
        <CardContent>
          <ImportersTable {...otherProps} />
        </CardContent>
      </Card>
    </Box>
  );
};
const StatusCell: FC<{ rowId: string }> = ({ rowId }) => {
  const result = useStoreSelector((s) => importResultsSelector(s, rowId));
  console.log('render StatusCell:' + result?.status);
  if (result?.status === ImportStatus.Prepareing) {
    console.log('isLoading');
    return <CircularProgress />;
  } else if (result?.status === ImportStatus.Success) {
    return <CheckIcon color="primary" />;
  } else if (result?.status === ImportStatus.Failed) {
    return <BlockIcon color="error" />;
  }
  return <div></div>;
};
const importResultsSelector = createSelector(
  bookImporterResultsSelector,
  (_: StoreState, id: string) => id,
  (importResults, id) => importResults[id]
);
const ImportersTable: FC<{
  importers: BookImporter[];
}> = (props) => {
  console.log('render StatusCell');
  const { importers } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      renderCell: ({ row }) => {
        return <StatusCell rowId={row['id'].toString()} />;
      },
    },
    {
      field: 'book_id',
      valueGetter: (params: GridValueGetterParams) => params.row.book.id,
    },
    {
      field: 'title',
      valueGetter: (params: GridValueGetterParams) => params.row.book.title,
    },
    {
      field: 'author',
      valueGetter: (params: GridValueGetterParams) => params.row.book.author,
    },
    {
      field: 'releaseDate',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.book.releaseDate,
      headerName: t('Release date'),
    },
  ];
  return (
    <Box mt={1}>
      <RouterDataGrid columns={columns} rows={importers} pageSize={20} />
    </Box>
  );
};
