import { FC } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Invitation } from 'src/store/state/domain/common/invitations/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  ACTION_WIDTH,
  actionsColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon } from 'src/view/base/material-ui/Icon';
import { LinkTo } from 'src/view/base/react-router/types';
import {
  getInvitationStatusLabel,
  getInvitationStatusOptions,
} from 'src/view/components/atoms/InvitationStatusOptions';
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
  invitations: Invitation[];
  status: StoreStatus;
  error: StoreError | undefined;
  actions: LinkActions<Invitation>;
  addTo?: LinkTo;
}> = (props) => {
  const { invitations, status, error, actions, addTo } = props;
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
      field: 'status',
      headerName: t('Status'),
      minWidth: 150,
      type: 'singleSelect',
      valueOptions: getInvitationStatusOptions(),
      renderCell: ({ value }) => getInvitationStatusLabel(value),
    },
    {
      field: 'createdAt',
      headerName: t('Created at'),
      ...timestampColDef,
    },
  ];

  return (
    <ContentWrapper>
      <ContentHeader links={[{ children: t('Home'), to: rootPath }]}>
        {t('Invitations')}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
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
