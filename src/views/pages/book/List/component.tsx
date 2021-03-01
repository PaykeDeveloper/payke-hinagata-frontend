import React, { FC } from 'react';
import { Box, Button } from '@material-ui/core';
import { Columns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { Book } from 'src/state/types/domain';
import {
  dateColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/views/base/material-ui/DataGrid';
import { AddIcon } from 'src/views/base/material-ui/Icon';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
import RouterLink from 'src/views/components/RouterLink';
import { getBookEditPath, rootPath } from 'src/views/routes/paths';

interface Props {
  books: Book[];
  status: StoreStatus;

  onClickAdd: () => void;
}

const Component: FC<Props> = (props) => {
  const { books, status, onClickAdd } = props;
  const { t } = useTranslation();

  const columns: Columns = [
    {
      field: 'id',
      headerName: t('ID'),
      renderCell: ({ value }) => (
        <RouterLink to={getBookEditPath({ bookId: value as Book['id'] })}>
          {value}
        </RouterLink>
      ),
    },
    { field: 'title', headerName: t('Title'), width: 200 },
    { field: 'author', headerName: t('Author'), width: 150 },
    {
      field: 'releaseDate',
      headerName: t('Release date'),
      ...dateColDef,
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
        <Trans>Books</Trans>
      </ContentHeader>
      <ContentBody>
        <Box mb={1}>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onClickAdd}
          >
            <Trans>Add</Trans>
          </Button>
        </Box>
        <Loader status={status}>
          <RouterDataGrid columns={columns} rows={books} />
        </Loader>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
