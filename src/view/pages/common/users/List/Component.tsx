import React, { FC } from 'react';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { User } from 'src/store/state/domain/common/users/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import Link from 'src/view/base/material-ui/Link';
import Loader from 'src/view/components/atoms/Loader';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  users: User[];
  statuses: StoreStatus[];
  errors: (StoreError | undefined)[];
  checkEdit: (userId: number | undefined) => boolean;

  onClickEdit: (userId: number) => void;
}> = (props) => {
  const { users, statuses, errors, checkEdit, onClickEdit } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const userId = row['id'];
        if (!checkEdit(userId)) {
          return <></>;
        }
        return <Link onClick={() => onClickEdit(userId)}>{t('Edit')}</Link>;
      },
    },
    {
      field: 'id',
      headerName: t('ID'),
      width: 100,
    },
    { field: 'name', headerName: t('Name'), width: 200 },
    { field: 'email', headerName: t('Email'), width: 150 },
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
        <Trans>Users</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper errors={errors}>
          <Loader statuses={statuses}>
            <RouterDataGrid columns={columns} rows={users} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
