// FIXME: SAMPLE CODE

import { FC } from 'react';
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  ACTION_WIDTH,
  actionsColDef,
  RouterDataGrid,
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
  divisions: Division[];
  status: StoreStatus;
  error: StoreError | undefined;
  actions: LinkActions<Division>;
  addTo?: LinkTo;
}> = (props) => {
  const { divisions, status, error, actions, addTo } = props;
  const { t } = useTranslation();
  const columns: GridColumns<Division> = [
    {
      renderCell: ({ row }) => <GridActions row={row} actions={actions} />,
      minWidth: actions.length * ACTION_WIDTH,
      ...actionsColDef,
    },
    { field: 'id', headerName: t('ID') },
    { field: 'name', headerName: t('name'), minWidth: 300, flex: 1 },
    {
      field: 'createdAt',
      headerName: t('Created at'),
      ...timestampColDef,
    },
  ];

  return (
    <ContentWrapper>
      <ContentHeader links={[{ children: t('Home'), to: rootPath }]}>
        {t('Divisions')}
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
            <RouterDataGrid columns={columns} rows={divisions} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
