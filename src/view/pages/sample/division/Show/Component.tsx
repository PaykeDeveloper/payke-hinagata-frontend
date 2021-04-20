// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { DivisionProject } from 'src/store/state/domain/sample/divisionProjects/types';
import { Division } from 'src/store/state/domain/sample/divisions/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import DefinitionList from 'src/view/base/material-ui/DefinitionList';
import {
  AddIcon,
  EditIcon,
  NavigateBeforeIcon,
} from 'src/view/base/material-ui/Icon';
import Link from 'src/view/base/material-ui/Link';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { divisionsPath, rootPath } from 'src/view/routes/paths';

const Component: FC<{
  division: Division | undefined;
  divisionStatus: StoreStatus;
  divisionProjects: DivisionProject[];
  divisionProjectsStatus: StoreStatus;
  errors: (StoreError | undefined)[];

  onBack: () => void;
  onClickEditDivision: () => void;
  onClickAddDivisionProject: () => void;
  onClickEditDivisionProject: (commentId: string) => void;
}> = (props) => {
  const {
    division,
    divisionStatus,
    divisionProjects,
    divisionProjectsStatus,
    errors,
    onBack,
    onClickEditDivision,
    onClickAddDivisionProject,
    onClickEditDivisionProject,
  } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Link onClick={() => onClickEditDivisionProject(row['id'] as string)}>
          {t('Edit')}
        </Link>
      ),
      width: 50,
    },
    { field: 'id', headerName: t('ID'), width: 100 },
    { field: 'name', headerName: t('Name'), width: 200 },
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
          { children: <Trans>Divisions</Trans>, to: divisionsPath },
        ]}
      >
        {division?.name}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper errors={errors}>
          <Box>
            <Buttons
              leftButtons={[
                <Button
                  onClick={onBack}
                  startIcon={<NavigateBeforeIcon />}
                  variant="outlined"
                >
                  <Trans>Back</Trans>
                </Button>,
                <Button
                  onClick={onClickEditDivision}
                  startIcon={<EditIcon />}
                  variant="outlined"
                  color="primary"
                >
                  <Trans>Edit</Trans>
                </Button>,
              ]}
            />
            <Loader status={divisionStatus}>
              <Card>
                <CardContent>
                  <DefinitionList
                    list={[
                      {
                        key: <Trans>Division</Trans>,
                        value: <Typography>{division?.name}</Typography>,
                      },
                      {
                        key: <Trans>Created date</Trans>,
                        value: (
                          <Typography>
                            {formatDate(division?.createdAt)}
                          </Typography>
                        ),
                      },
                      {
                        key: <Trans>Updated date</Trans>,
                        value: (
                          <Typography>
                            {formatDate(division?.updatedAt)}
                          </Typography>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Loader>
          </Box>
          <Box mt={3}>
            <Typography variant="h5">
              <Trans>Comments</Trans>
            </Typography>
            <Box mt={1}>
              <Buttons
                leftButtons={[
                  <Button
                    onClick={onClickAddDivisionProject}
                    startIcon={<AddIcon />}
                    color="primary"
                    variant="outlined"
                  >
                    <Trans>Add</Trans>
                  </Button>,
                ]}
              />
              <Loader status={divisionProjectsStatus}>
                <RouterDataGrid columns={columns} rows={divisionProjects} />
              </Loader>
            </Box>
          </Box>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
