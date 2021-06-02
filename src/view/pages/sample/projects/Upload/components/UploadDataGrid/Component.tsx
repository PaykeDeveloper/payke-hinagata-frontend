// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { GridColumns } from '@material-ui/data-grid';
import { GridOverlay } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadMethod, UploadRow } from 'src/store/types';
import BaseDataGrid, {
  booleanColDef,
  dateColDef,
  dateTimeColDef,
} from 'src/view/base/material-ui/DataGrid';
import UploadMethodCell from 'src/view/components/atoms/UploadMethodCell';
import ActionCell from './components/ActionCell';
import ErrorCell from './components/ErrorCell';
import Progress from './components/Progress';
import ValueCell from './components/ValueCell';

type Row = UploadRow<UploadProjectInput>;

export const Component: FC<{
  rows: UploadRow<UploadProjectInput>[];
  onRestart: (id: string) => void;
  onRemove: (id: string) => void;
}> = (props) => {
  const { rows, onRestart, onRemove } = props;
  const { t } = useTranslation();
  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('Status'),
      align: 'center',
      renderCell: ({ row }) => (
        <ActionCell id={row['id']} onRestart={onRestart} onRemove={onRemove} />
      ),
    },
    {
      field: 'method',
      headerName: t('Method'),
      valueGetter: ({ row }) => {
        const { slug, deleteFlag } = (row as Row).data;
        if (!slug) {
          return UploadMethod.Add;
        } else if (deleteFlag) {
          return UploadMethod.Remove;
        } else {
          return UploadMethod.Merge;
        }
      },
      renderCell: ({ value }) => (
        <UploadMethodCell method={value as UploadMethod} />
      ),
    },
    {
      field: 'slug',
      headerName: t('Slug'),
      width: 310,
      valueGetter: ({ row }) => (row as Row).data.slug,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell id={row['id']} formattedValue={formattedValue} name="slug" />
      ),
    },
    {
      field: 'name',
      headerName: t('Name'),
      width: 200,
      valueGetter: ({ row }) => (row as Row).data.name,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell id={row['id']} formattedValue={formattedValue} name="name" />
      ),
    },
    {
      field: 'description',
      headerName: t('Description'),
      width: 300,
      valueGetter: ({ row }) => (row as Row).data.description,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="description"
        />
      ),
    },
    {
      field: 'priority',
      headerName: t('Priority'),
      valueGetter: ({ row }) => (row as Row).data.priority,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="priority"
        />
      ),
    },
    {
      ...booleanColDef,
      field: 'approved',
      headerName: t('Approved'),
      valueGetter: ({ row }) => (row as Row).data.approved,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="approved"
        />
      ),
    },
    {
      ...dateColDef,
      field: 'startDate',
      headerName: t('Start Date'),
      valueGetter: ({ row }) => (row as Row).data.startDate,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="startDate"
        />
      ),
    },
    {
      ...dateTimeColDef,
      field: 'finishedAt',
      headerName: t('Finished At'),
      valueGetter: ({ row }) => (row as Row).data.finishedAt,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="finishedAt"
        />
      ),
    },
    {
      field: 'difficulty',
      headerName: t('Difficulty'),
      type: 'number',
      valueGetter: ({ row }) => (row as Row).data.difficulty,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="difficulty"
        />
      ),
    },
    {
      field: 'coefficient',
      headerName: t('Coefficient'),
      type: 'number',
      valueGetter: ({ row }) => (row as Row).data.coefficient,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="coefficient"
        />
      ),
    },
    {
      field: 'productivity',
      headerName: t('Productivity'),
      type: 'number',
      valueGetter: ({ row }) => (row as Row).data.productivity,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="productivity"
        />
      ),
    },
    {
      field: 'lockVersion',
      headerName: t('Lock Version'),
      type: 'number',
      valueGetter: ({ row }) => (row as Row).data.lockVersion,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
          name="lockVersion"
        />
      ),
    },
    {
      ...booleanColDef,
      field: 'deleteFlag',
      headerName: t('Delete Flag'),
      valueGetter: ({ row }) => (row as Row).data.deleteFlag,
      renderCell: ({ row, formattedValue }) => (
        <ValueCell
          id={row['id']}
          formattedValue={formattedValue}
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
              <Progress />
            </div>
          </GridOverlay>
        ),
      }}
    />
  );
};

export default Component;
