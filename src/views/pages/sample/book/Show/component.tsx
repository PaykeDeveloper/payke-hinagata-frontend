import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { BookComment } from 'src/state/ducks/domain/sample/bookComments/types';
import { Book } from 'src/state/ducks/domain/sample/books/types';
import { StoreStatus } from 'src/state/types';
import {
  dateColDef,
  dateTimeColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/views/base/material-ui/DataGrid';
import DefinitionList from 'src/views/base/material-ui/DefinitionList';
import {
  AddIcon,
  EditIcon,
  NavigateBeforeIcon,
} from 'src/views/base/material-ui/Icon';
import Link from 'src/views/base/material-ui/Link';
import Buttons from 'src/views/components/common/Buttons';
import ContentBody from 'src/views/components/common/ContentBody';
import ContentHeader from 'src/views/components/common/ContentHeader';
import ContentWrapper from 'src/views/components/common/ContentWrapper';
import Loader from 'src/views/components/common/Loader';
import { booksPath, rootPath } from 'src/views/routes/paths';

interface Props {
  book: Book | undefined;
  bookStatus: StoreStatus;
  bookComments: BookComment[];
  bookCommentsStatus: StoreStatus;

  onBack: () => void;
  onClickEditBook: () => void;
  onClickAddBookComment: () => void;
  onClickEditBookComment: (commentId: string) => void;
}

const Component: FC<Props> = (props) => {
  const {
    book,
    // bookStatus,
    bookComments,
    bookCommentsStatus,
    onBack,
    onClickEditBook,
    onClickAddBookComment,
    onClickEditBookComment,
  } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: ' ',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Link onClick={() => onClickEditBookComment(row['id'] as string)}>
          {t('Edit')}
        </Link>
      ),
      width: 50,
    },
    { field: 'slug', headerName: t('Slug'), width: 200 },
    { field: 'confirmed', headerName: t('Confirmed'), width: 100 },
    { field: 'publishDate', headerName: t('Publish date'), ...dateColDef },
    {
      field: 'approvedAt',
      headerName: t('Approved at'),
      ...dateTimeColDef,
    },
    { field: 'Amount', headerName: t('Amount'), width: 100 },
    { field: 'column', headerName: t('Column'), width: 100 },
    { field: 'choices', headerName: t('Choices'), width: 100 },
    { field: 'votes', headerName: t('Votes'), width: 100 },
    { field: 'coverUrl', headerName: t('Cover'), width: 200 },
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
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: <Trans>Books</Trans>, to: booksPath },
        ]}
      >
        {book?.title}
      </ContentHeader>
      <ContentBody>
        <Box>
          <Buttons
            leftButtons={[
              <Button
                onClick={onBack}
                startIcon={<NavigateBeforeIcon />}
                variant="outlined"
              >
                <Trans>Back</Trans>
              </Button>,
              <Button
                onClick={onClickEditBook}
                startIcon={<EditIcon />}
                variant="outlined"
                color="primary"
              >
                <Trans>Edit</Trans>
              </Button>,
            ]}
          />
          <Card>
            <CardContent>
              <DefinitionList
                list={[
                  {
                    key: <Trans>Author</Trans>,
                    value: <Typography>{book?.author}</Typography>,
                  },
                  {
                    key: <Trans>Release date</Trans>,
                    value: (
                      <Typography>{formatDate(book?.releaseDate)}</Typography>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Typography variant="h5">
            <Trans>Comments</Trans>
          </Typography>
          <Box mt={1}>
            <Buttons
              leftButtons={[
                <Button
                  onClick={onClickAddBookComment}
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="outlined"
                >
                  <Trans>Add</Trans>
                </Button>,
              ]}
            />
            <Loader status={bookCommentsStatus}>
              <RouterDataGrid columns={columns} rows={bookComments} />
            </Loader>
          </Box>
        </Box>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
