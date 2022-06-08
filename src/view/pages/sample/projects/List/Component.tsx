// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Project } from 'src/store/state/domain/sample/projects/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  actionsColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon, FileDownloadIcon } from 'src/view/base/material-ui/Icon';
import Link from 'src/view/base/material-ui/Link';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  projects: Project[];
  status: StoreStatus;
  error: StoreError | undefined;
  exportUrl: string;
  division: Division | undefined;
  canView: boolean;

  onClickAdd?: () => void;
  onClickEdit?: (projectSlug: string) => void;
}> = (props) => {
  const {
    projects,
    status,
    error,
    exportUrl,
    division,
    canView,
    onClickAdd,
    onClickEdit,
  } = props;
  const { t } = useTranslation();

  const projectColumns: GridColumns = [
    {
      renderCell: ({ row }) =>
        onClickEdit ? (
          <Link onClick={() => onClickEdit(row['slug'])}>{t('Edit')}</Link>
        ) : (
          <></>
        ),
      ...actionsColDef,
    },
    { field: 'slug', headerName: t('Slug'), width: 310 },
    { field: 'name', headerName: t('Name'), width: 350, flex: 1 },
    {
      field: 'createdAt',
      headerName: t('Created at'),
      ...timestampColDef,
    },
    {
      field: 'updatedAt',
      headerName: t('Updated at'),
      ...timestampColDef,
    },
  ];

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: division?.name },
        ]}
      >
        <Trans>Projects</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              onClickAdd ? (
                <Button
                  onClick={onClickAdd}
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="outlined"
                >
                  <Trans>Add</Trans>
                </Button>
              ) : undefined,
              canView ? (
                <Button
                  startIcon={<FileDownloadIcon />}
                  color="primary"
                  variant="outlined"
                  href={exportUrl}
                  download
                >
                  <Trans>Download CSV</Trans>
                </Button>
              ) : undefined,
            ]}
          />
          <Loader status={status}>
            <RouterDataGrid columns={projectColumns} rows={projects} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
