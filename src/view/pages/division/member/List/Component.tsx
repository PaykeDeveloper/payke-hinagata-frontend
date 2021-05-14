// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { User } from 'src/store/state/domain/common/user/types';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Member } from 'src/store/state/domain/division/members/types';
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
import { rootPath } from 'src/view/routes/paths';

export type PermissionList = {
  divisionUpdate: boolean;
  memberCreate: boolean;
  memberUpdate: boolean;
};

const Component: FC<{
  division: Division | undefined;
  divisionStatus: StoreStatus;
  userIdMap: Record<number, User>;
  members: Member[];
  usersStatus: StoreStatus;
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
    userIdMap,
    members,
    usersStatus,
    membersStatus,
    errors,
    permission,
    onBack,
    onClickEditDivision,
    onClickAddMember,
    onClickEditMember,
  } = props;

  const statuses = [divisionStatus, membersStatus, usersStatus];

  const { t } = useTranslation();

  const memberColumns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <>
          {permission.memberUpdate ? (
            <Link onClick={() => onClickEditMember(row['id'] as string)}>
              {t('Edit')}
            </Link>
          ) : null}
        </>
      ),
      width: 50,
    },
    {
      field: 'name',
      headerName: t('Name'),
      width: 200,
      renderCell: ({ row }) => <>{userIdMap[row['userId']]?.name}</>,
    },
    { field: 'id', headerName: t('Member ID'), width: 130 },
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
      <ContentHeader links={[{ children: <Trans>Home</Trans>, to: rootPath }]}>
        <Trans>Members</Trans>
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
                  disabled={!permission.divisionUpdate}
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
                    disabled={!permission.memberCreate}
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
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
