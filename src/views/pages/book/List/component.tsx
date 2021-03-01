import React, { FC } from 'react';
import { GridColumns } from '@material-ui/data-grid';
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
  onClickLink: (bookId: number) => void;
}

const Component: FC<Props> = (props) => {
  const { books, status, onClickAdd, onClickLink } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: t('ID'),
      renderCell: ({ value }) => (
        <Link onClick={() => onClickLink(value as Book['id'])}>{value}</Link>
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
            {
              onClick: onClickAdd,
              children: <Trans>Add</Trans>,
              startIcon: <AddIcon />,
            },
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
