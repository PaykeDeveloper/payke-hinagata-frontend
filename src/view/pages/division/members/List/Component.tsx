// FIXME: SAMPLE CODE

import { FC } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { User } from 'src/store/state/domain/common/users/types';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { Member } from 'src/store/state/domain/division/members/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  ACTION_WIDTH,
  RouterDataGrid,
  actionsColDef,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import { AddIcon } from 'src/view/base/material-ui/Icon';
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
  members: Member[];
  status: StoreStatus;
  error: StoreError | undefined;
  userIdMap: Record<number, User>;
  division: Division | undefined;
  actions: LinkActions<Member>;
  addTo?: LinkTo;
}> = (props) => {
  const { members, status, error, userIdMap, division, actions, addTo } = props;
  const { t } = useTranslation();

  const memberColumns: GridColumns = [
    {
      renderCell: ({ row }) => <GridActions row={row} actions={actions} />,
      minWidth: actions.length * ACTION_WIDTH,
      ...actionsColDef,
    },
    { field: 'id', headerName: t<string>('ID') },
    {
      field: 'name',
      headerName: t<string>('Name'),
      minWidth: 300,
      flex: 1,
      renderCell: ({ row }) => <>{userIdMap[row['userId']]?.name}</>,
    },
    { field: 'roleNames', headerName: t<string>('Role Names'), minWidth: 200 },
    {
      field: 'createdAt',
      headerName: t<string>('Created at'),
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
        {t('Members')}
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
            <RouterDataGrid columns={memberColumns} rows={members} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
