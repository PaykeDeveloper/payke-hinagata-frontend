import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import {
  Invitation,
  InvitationStatus,
} from 'src/store/state/domain/common/invitations/types';
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

const InvitationStatusLabel: FC<{ status: InvitationStatus }> = ({
  status,
}) => {
  const { t } = useTranslation();
  let children: string;
  switch (status) {
    case InvitationStatus.Approved: {
      children = t('Approved');
      break;
    }
    case InvitationStatus.Denied: {
      children = t('Denied');
      break;
    }
    case InvitationStatus.Pending: {
      children = t('Pending');
      break;
    }
  }
  return <>{children}</>;
};

const Component: FC<{
  invitations: Invitation[];
  status: StoreStatus;
  error: StoreError | undefined;

  onClickAdd?: () => void;
  onClickEdit?: (invitationId: number) => void;
}> = (props) => {
  const { invitations, status, error, onClickAdd, onClickEdit } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        if (!onClickEdit || row['status'] !== InvitationStatus.Pending) {
          return <></>;
        }
        return (
          <Link onClick={() => onClickEdit(row['id'] as number)}>
            {t('Edit')}
          </Link>
        );
      },
    },
    {
      field: 'id',
      headerName: t('ID'),
      width: 100,
    },
    { field: 'name', headerName: t('Name'), width: 300 },
    { field: 'email', headerName: t('Email'), width: 300 },
    {
      field: 'status',
      headerName: t('Status'),
      width: 150,
      renderCell: ({ value }) => (
        <InvitationStatusLabel status={value as InvitationStatus} />
      ),
    },
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
        <Trans>Invitations</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              <Button
                onClick={onClickAdd}
                startIcon={<AddIcon />}
                color="primary"
                variant="outlined"
              >
                <Trans>Add</Trans>
              </Button>,
            ]}
          />
          <Loader status={status}>
            <RouterDataGrid columns={columns} rows={invitations} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
