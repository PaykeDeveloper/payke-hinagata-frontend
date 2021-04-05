// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { GridColumns } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { BookComment } from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { StoreError, StoreStatus } from 'src/store/types';
import {
  dateColDef,
  dateTimeColDef,
  RouterDataGrid,
  timestampColDef,
} from 'src/view/base/material-ui/DataGrid';
import DefinitionList from 'src/view/base/material-ui/DefinitionList';
import {
  AddIcon,
  EditIcon,
  NavigateBeforeIcon,
} from 'src/view/base/material-ui/Icon';
import Link from 'src/view/base/material-ui/Link';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { booksPath, rootPath } from 'src/view/routes/paths';

const Component: FC<{
  book: Book | undefined;
  bookStatus: StoreStatus;
  bookComments: BookComment[];
  bookCommentsStatus: StoreStatus;
  errors: (StoreError | undefined)[];

  onBack: () => void;
  onClickEditBook: () => void;
  onClickAddBookComment: () => void;
  onClickEditBookComment: (commentSlug: string) => void;
}> = (props) => {
  const {
    book,
    bookStatus,
    bookComments,
    bookCommentsStatus,
    errors,
    onBack,
    onClickEditBook,
    onClickAddBookComment,
    onClickEditBookComment,
  } = props;
  const { t } = useTranslation();

  const columns: GridColumns = [
    {
      field: 'slug',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Link onClick={() => onClickEditBookComment(row['slug'] as string)}>
          {t('Edit')}
        </Link>
      ),
      width: 50,
    },
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
        <ErrorWrapper errors={errors}>
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
            <Loader status={bookStatus}>
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
                          <Typography>
                            {formatDate(book?.releaseDate)}
                          </Typography>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Loader>
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
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
