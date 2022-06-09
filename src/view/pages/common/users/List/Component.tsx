import { FC } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { User } from 'src/store/state/domain/common/users/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  ACTION_WIDTH,
  actionsColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import Loader from 'src/view/components/atoms/Loader';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import GridActions, {
  LinkActions,
} from 'src/view/components/molecules/GridActions';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  users: User[];
  status: StoreStatus;
  error: StoreError | undefined;
  actions: LinkActions<User>;
}> = (props) => {
  const { users, status, error, actions } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      renderCell: ({ row }) => <GridActions row={row} actions={actions} />,
      minWidth: actions.length * ACTION_WIDTH,
      ...actionsColDef,
    },
    { field: 'id', headerName: t('ID') },
    { field: 'name', headerName: t('Name'), minWidth: 300, flex: 1 },
    { field: 'email', headerName: t('Email'), minWidth: 300, flex: 1 },
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
      <ContentHeader links={[{ children: t('Home'), to: rootPath }]}>
        {t('Users')}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Loader status={status}>
            <RouterDataGrid columns={columns} rows={users} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
