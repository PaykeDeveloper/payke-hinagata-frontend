// FIXME: SAMPLE CODE

import { FC } from 'react';
import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Project } from 'src/store/state/domain/sample/projects/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  ACTION_WIDTH,
  RouterDataGrid,
  actionsColDef,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import {
  AddIcon,
  FileDownloadIcon,
  NavigateBeforeIcon,
} from 'src/view/base/material-ui/Icon';
import { LinkTo } from 'src/view/base/react-router/types';
import LinkButton from 'src/view/components/atoms/LinkButton';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import GridActions, {
  LinkActions,
} from 'src/view/components/molecules/GridActions';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  projects: Project[];
  status: StoreStatus;
  error: StoreError | undefined;
  exportUrl: string;
  division: Division | undefined;
  actions: LinkActions<Project>;
  addTo?: LinkTo;
  backTo: LinkTo;
}> = (props) => {
  const {
    projects,
    status,
    error,
    exportUrl,
    division,
    actions,
    addTo,
    backTo,
  } = props;
  const { t } = useTranslation();

  const projectColumns: GridColumns = [
    {
      renderCell: ({ row }) => <GridActions row={row} actions={actions} />,
      minWidth: actions.length * ACTION_WIDTH,
      ...actionsColDef,
    },
    { field: 'slug', headerName: t('Slug'), minWidth: 310 },
    { field: 'name', headerName: t('Name'), minWidth: 350, flex: 1 },
    {
      field: 'createdAt',
      headerName: t('Created at'),
      ...timestampColDef,
    },
  ];

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: division?.name },
        ]}
      >
        {t('Projects')}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              <LinkButton
                to={backTo}
                startIcon={<NavigateBeforeIcon />}
                variant="outlined"
              >
                {t('Back')}
              </LinkButton>,
              addTo ? (
                <LinkButton
                  to={addTo}
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="outlined"
                >
                  {t('Add')}
                </LinkButton>
              ) : undefined,
              <Button
                startIcon={<FileDownloadIcon />}
                color="primary"
                variant="outlined"
                href={exportUrl}
                download
              >
                {t('Download CSV')}
              </Button>,
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
