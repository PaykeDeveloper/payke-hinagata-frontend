// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Division } from 'src/store/state/domain/sample/divisions/types';
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

const useStyles = makeStyles((theme) => ({
  showLink: {
    marginRight: theme.spacing(1),
  },
}));

const Component: FC<{
  divisions: Division[];
  status: StoreStatus;
  error: StoreError | undefined;
  hasCreatePermission?: boolean;
  hasUpdatePermission?: boolean;

  onClickAdd: () => void;
  onClickShow: (bookId: number) => void;
  onClickEdit: (bookId: number) => void;
}> = (props) => {
  const {
    divisions,
    status,
    error,
    hasCreatePermission,
    hasUpdatePermission,
    onClickAdd,
    onClickShow,
    onClickEdit,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const columns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Box>
          <Link
            className={classes.showLink}
            onClick={() => onClickShow(row['id'] as number)}
          >
            {t('Show')}
          </Link>
          {hasUpdatePermission ? (
            <Link onClick={() => onClickEdit(row['id'] as number)}>
              {t('Edit')}
            </Link>
          ) : null}
        </Box>
      ),
    },
    {
      field: 'id',
      headerName: t('ID'),
      width: 100,
    },
    { field: 'name', headerName: t('name'), width: 200 },
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
        <Trans>Divisions</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              <Button
                disabled={!hasCreatePermission}
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
            <RouterDataGrid columns={columns} rows={divisions} />
          </Loader>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
