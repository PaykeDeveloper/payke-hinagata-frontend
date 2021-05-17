// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { User } from 'src/store/state/domain/common/user/types';
import { Member } from 'src/store/state/domain/division/members/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon } from 'src/view/base/material-ui/Icon';
import Link from 'src/view/base/material-ui/Link';
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
  canCreate: boolean;
  checkEdit: (memberId: number) => boolean;

  onClickAdd: () => void;
  onClickEdit: (memberId: number) => void;
}> = (props) => {
  const {
    members,
    status,
    error,
    userIdMap,
    canCreate,
    checkEdit,
    onClickAdd,
    onClickEdit,
  } = props;
  const { t } = useTranslation();

  const memberColumns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const memberId = row['id'];
        if (!checkEdit(memberId)) {
          return <></>;
        }
        return <Link onClick={() => onClickEdit(memberId)}>{t('Edit')}</Link>;
      },
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
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              canCreate ? (
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
