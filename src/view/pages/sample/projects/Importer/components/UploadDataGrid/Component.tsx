// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { GridColumns, GridValueGetterParams } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { RouterDataGrid } from 'src/view/base/material-ui/DataGrid';
import ErrorCell from './components/ErrorCell';
import ImportProgress from './components/ImportProgress';
import StatusCell from './components/StatusCell';

export const Component: FC<{
  uploadProjects: UploadProjectInput[];
}> = (props) => {
  const { uploadProjects } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    { field: 'id', hide: true },
    {
      field: 'status',
      headerName: t('Status'),
      type: 'number',
      flex: 0.5,
      renderCell: ({ row }) => {
        return <StatusCell index={row['id']} />;
      },
    },
    {
      field: 'slug',
      flex: 0.6,
      valueGetter: (params: GridValueGetterParams) => params.row.project.slug,
    },
    {
      field: 'name',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => params.row.project.name,
    },
    {
      field: 'errorMessage',
      headerName: t('error message'),
      flex: 3,
      renderCell: ({ row }) => {
        return <ErrorCell index={row['id']} />;
      },
    },
  ];
  return (
    <RouterDataGrid
      columns={columns}
      rows={uploadProjects}
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
