import React, { FC } from 'react';
import { Columns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { Book } from 'src/state/types/domain';
import BaseDataGrid from 'src/views/base/material-ui/DataGrid';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
// import RouterLink from 'src/views/components/RouterLink';
import Loader from 'src/views/components/Loader';
import { rootPath } from 'src/views/routes/paths';

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
      // renderCell: ({ value }) => <RouterLink to={getBookPath(value)}>{value}</RouterLink>,
    },
    { field: 'title', headerName: t('Title') },
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
