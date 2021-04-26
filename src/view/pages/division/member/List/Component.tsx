// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Member } from 'src/store/state/domain/division/members/types';
import { Project } from 'src/store/state/domain/sample/projects/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Link from 'src/view/base/material-ui/Link';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import {
  divisionsPath,
  getDivisionPath,
  rootPath,
} from 'src/view/routes/paths';

export type PermissionList = {
  divisionUpdate: boolean;
  projectCreate: boolean;
  projectUpdate: boolean;
  memberView: boolean;
};

const Component: FC<{
  division: Division | undefined;
  divisionStatus: StoreStatus;
  projects: Project[];
  projectsStatus: StoreStatus;
  members: Member[];
  membersStatus: StoreStatus;
  errors: (StoreError | undefined)[];
  permission: PermissionList;

  onBack: () => void;
  onClickEditDivision: () => void;
  onClickAddMember: () => void;
  onClickEditMember: (memberId: string) => void;
}> = (props) => {
  const {
    division,
    divisionStatus,
    members,
    membersStatus,
    errors,
    permission,
    onBack,
    onClickAddMember,
    onClickEditMember,
  } = props;

  const statuses = [divisionStatus, membersStatus];

  const { t } = useTranslation();

  const memberColumns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <>
          {permission.projectUpdate ? (
            <Link onClick={() => onClickEditMember(row['id'] as string)}>
              {t('Edit')}
            </Link>
          ) : null}
        </>
      ),
      width: 50,
    },
    { field: 'id', headerName: t('ID'), width: 100 },
    { field: 'userId', headerName: t('UserID'), width: 200 },
    { field: 'roleNames', headerName: t('Role Names'), width: 200 },
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
          {
            children: division?.name,
            to: getDivisionPath({ divisionId: `${division?.id}` }),
          },
        ]}
      >
        <Trans>Members</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper errors={errors}>
          {permission.memberView && (
            <Box mt={3}>
              <Typography variant="h5">
                <Trans>Members</Trans>
              </Typography>
              <Box mt={1}>
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
                      disabled={!permission.projectCreate}
                      onClick={onClickAddMember}
                      startIcon={<AddIcon />}
                      color="primary"
                      variant="outlined"
                    >
                      <Trans>Add</Trans>
                    </Button>,
                  ]}
                />
                <Loader statuses={statuses}>
                  <RouterDataGrid columns={memberColumns} rows={members} />
                </Loader>
              </Box>
            </Box>
          )}
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
