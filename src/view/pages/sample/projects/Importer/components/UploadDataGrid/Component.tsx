// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { GridColumns } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadRow } from 'src/store/types';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import ErrorCell from './components/ErrorCell';
import ImportProgress from './components/ImportProgress';
import StatusCell from './components/StatusCell';
import ValueCell from './components/ValueCell';

export const Component: FC<{
  rows: UploadRow<UploadProjectInput>[];
}> = (props) => {
  const { rows } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      headerName: t('Status'),
      type: 'number',
      flex: 0.5,
      renderCell: ({ row }) => <StatusCell id={row['id']} />,
    },
    {
      field: 'slug',
      flex: 0.6,
      renderCell: ({ row }) => (
        <ValueCell row={row as UploadRow<UploadProjectInput>} name="slug" />
      ),
    },
    {
      field: 'name',
      flex: 1,
      renderCell: ({ row }) => (
        <ValueCell row={row as UploadRow<UploadProjectInput>} name="name" />
      ),
    },
    {
      field: 'errorMessage',
      headerName: t('error message'),
      flex: 3,
      renderCell: ({ row }) => <ErrorCell id={row['id']} />,
    },
  ];
  return (
    <RouterDataGrid
      columns={columns}
      rows={rows}
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
              <ImportProgress />
            </div>
          </GridOverlay>
        ),
      }}
    />
  );
};

export default Component;
