// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { GridColumns } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadRow } from 'src/store/types';
import BaseDataGrid from 'src/view/base/material-ui/DataGrid';
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
    {
      field: 'status',
      headerName: t('Status'),
      align: 'right',
      renderCell: ({ row }) => <StatusCell id={row['id']} />,
    },
    {
      field: 'slug',
      headerName: t('Slug'),
      width: 310,
      renderCell: ({ row }) => (
        <ValueCell row={row as UploadRow<UploadProjectInput>} name="slug" />
      ),
    },
    {
      field: 'name',
      headerName: t('Name'),
      width: 200,
      renderCell: ({ row }) => (
        <ValueCell row={row as UploadRow<UploadProjectInput>} name="name" />
      ),
    },
    {
      field: 'description',
      headerName: t('Description'),
      width: 300,
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="description"
        />
      ),
    },
    {
      field: 'priority',
      headerName: t('Priority'),
      renderCell: ({ row }) => (
        <ValueCell row={row as UploadRow<UploadProjectInput>} name="priority" />
      ),
    },
    {
      field: 'approved',
      headerName: t('Approved'),
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="approved"
          type="boolean"
        />
      ),
    },
    {
      field: 'startDate',
      headerName: t('Start Date'),
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="startDate"
          type="date"
        />
      ),
    },
    {
      field: 'finishedAt',
      headerName: t('Finished At'),
      width: 150,
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="finishedAt"
          type="datetime"
        />
      ),
    },
    {
      field: 'difficulty',
      headerName: t('Difficulty'),
      type: 'number',
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="difficulty"
        />
      ),
    },
    {
      field: 'coefficient',
      headerName: t('Coefficient'),
      type: 'number',
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="coefficient"
        />
      ),
    },
    {
      field: 'productivity',
      headerName: t('Productivity'),
      type: 'number',
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="productivity"
        />
      ),
    },
    {
      field: 'lockVersion',
      headerName: t('Lock Version'),
      type: 'number',
      renderCell: ({ row }) => (
        <ValueCell
          row={row as UploadRow<UploadProjectInput>}
          name="lockVersion"
        />
      ),
    },
    {
      field: 'errorMessage',
      width: 300,
      headerName: t('Error Message'),
      renderCell: ({ row }) => <ErrorCell id={row['id']} />,
    },
  ];
  return (
    <BaseDataGrid
      columns={columns}
      rows={rows}
      disableColumnMenu
      loading
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
