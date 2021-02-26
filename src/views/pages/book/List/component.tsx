import React, { FC } from 'react';
import { Columns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { Book } from 'src/state/types/domain';
import BaseDataGrid, {
  dateColDef,
  timestampColDef,
} from 'src/views/base/material-ui/DataGrid';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
import RouterLink from 'src/views/components/RouterLink';
import { getBookEditPath, rootPath } from 'src/views/routes/paths';

interface Props {
  books: Book[];
  status: StoreStatus;
}

const Component: FC<Props> = (props) => {
  const { books, status } = props;
  const { t } = useTranslation();
  console.log(books);

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
    { field: 'title', headerName: t('Title') },
    { field: 'author', headerName: t('Author') },
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
        <Loader status={status}>
          <BaseDataGrid columns={columns} rows={books} />
        </Loader>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
