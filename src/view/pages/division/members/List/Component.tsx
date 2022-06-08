// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { User } from 'src/store/state/domain/common/users/types';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Member } from 'src/store/state/domain/division/members/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  actionsColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon } from 'src/view/base/material-ui/Icon';
// import Link from 'src/view/base/material-ui/Link';
import LinkButton from 'src/view/components/atoms/LinkButton';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  members: Member[];
  status: StoreStatus;
  error: StoreError | undefined;
  userIdMap: Record<number, User>;
  division: Division | undefined;
  checkEdit: (memberId: number) => boolean;

  onClickAdd?: () => void;
  onClickEdit: (memberId: number) => void;
}> = (props) => {
  const {
    members,
    status,
    error,
    userIdMap,
    division,
    checkEdit,
    onClickAdd,
    // onClickEdit,
  } = props;
  const { t } = useTranslation();

  const memberColumns: GridColumns = [
    {
      renderCell: ({ row }) => {
        const memberId = row['id'];
        if (!checkEdit(memberId)) {
          return <></>;
        }
        return (
          <>
            <LinkButton to="/" size="small">
              {t('Edit')}
            </LinkButton>
            <LinkButton to="/" size="small">
              {t('Edit')}
            </LinkButton>
          </>
        );
      },
      minWidth: 150,
      ...actionsColDef,
    },
    { field: 'id', headerName: t('ID'), minWidth: 100 },
    {
      field: 'name',
      headerName: t('Name'),
      minWidth: 300,
      flex: 1,
      renderCell: ({ row }) => <>{userIdMap[row['userId']]?.name}</>,
    },
    { field: 'roleNames', headerName: t('Role Names'), minWidth: 200 },
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
        <Trans>Members</Trans>
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
            ]}
          />
          <Loader status={status}>
            <RouterDataGrid columns={memberColumns} rows={members} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
