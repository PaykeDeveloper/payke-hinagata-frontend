import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { Book } from 'src/state/ducks/domain/books/types';
import { StoreStatus } from 'src/state/types/base';
import {
  dateColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/views/base/material-ui/DataGrid';
import { AddIcon } from 'src/views/base/material-ui/Icon';
import Link from 'src/views/base/material-ui/Link';
import Buttons from 'src/views/components/Buttons';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
import { rootPath } from 'src/views/routes/paths';

interface Props {
  books: Book[];
  status: StoreStatus;

  onClickAdd: () => void;
  onClickShow: (bookId: number) => void;
}

const Component: FC<Props> = (props) => {
  const { books, status, onClickAdd, onClickShow } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: t('ID'),
      renderCell: ({ value }) => (
        <Link onClick={() => onClickShow(value as Book['id'])}>{value}</Link>
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
          <RouterDataGrid columns={columns} rows={books} />
        </Loader>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
