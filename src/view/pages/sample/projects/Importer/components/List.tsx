import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { useStoreSelector } from 'src/store';
import { importResultSelector } from 'src/store/state/ui/sample/importers/projects/selectors';
import {
  ProjectImporter,
  ImportStatus,
} from 'src/store/state/ui/sample/importers/projects/types';
import {
  getErrorMessage,
  isStoreError,
  isUnprocessableEntityError,
} from 'src/store/utils';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import { BlockIcon, CheckIcon } from 'src/view/base/material-ui/Icon';

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
export const List: FC<{
  importers: ProjectImporter[];
  children?: React.ReactNode;
}> = (props) => {
  const { importers, children } = props;
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
      flex: 0.6,
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
              {children}
            </div>
          </GridOverlay>
        ),
      }}
    />
  );
};

export default List;
