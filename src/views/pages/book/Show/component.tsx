import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { BookComment } from 'src/state/ducks/domain/bookComments/types';
import { Book } from 'src/state/ducks/domain/books/types';
import { StoreStatus } from 'src/state/types/base';
import {
  dateColDef,
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
import Buttons from 'src/views/components/Buttons';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
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
      field: 'id',
      headerName: t('ID'),
      renderCell: ({ value }) => (
        <Link
          onClick={() => onClickEditBookComment(value as BookComment['id'])}
        >
          {value}
        </Link>
      ),
    },
    { field: 'confirmed', headerName: t('Confirmed'), width: 100 },
    { field: 'publishDate', headerName: t('Publish date'), ...dateColDef },
    {
      field: 'approvedAt',
      headerName: t('Approved at'),
      ...timestampColDef,
    },
    { field: 'Amount', headerName: t('Amount'), width: 100 },
    { field: 'column', headerName: t('Column'), width: 100 },
    { field: 'choices', headerName: t('Choices'), width: 100 },
    { field: 'votes', headerName: t('Votes'), width: 100 },
    { field: 'slug', headerName: t('Slug'), width: 200 },
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
