import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Trans } from 'react-i18next';
import { BookCommentInput } from 'src/state/ducks/domain/bookComments/types';
import { Book } from 'src/state/ducks/domain/books/types';
import { StoreStatus } from 'src/state/types/base';
import { BaseForm } from 'src/views/base/formik/Form';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import { BaseTextField, DateTextField } from 'src/views/base/formik/TextField';
import { OnSubmit } from 'src/views/base/formik/types';
import {
  DeleteIcon,
  NavigateBeforeIcon,
} from 'src/views/base/material-ui/Icon';
import Buttons from 'src/views/components/Buttons';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
import LoaderButton from 'src/views/components/LoaderButton';
import { booksPath, getBookPath, rootPath } from 'src/views/routes/paths';
import * as yup from 'yup';

export interface FormProps {
  title: string;
  object?: BookCommentInput;
  status: StoreStatus;
  book: Book | undefined;

  onSubmit: OnSubmit<BookCommentInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}

const Form: FC<FormProps> = (props) => {
  const { title, object, status, book, onSubmit, onBack, onDelete } = props;
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: <Trans>Books</Trans>, to: booksPath },
          {
            children: <Trans>{book?.title}</Trans>,
            to: getBookPath({ bookId: `${book?.id}` }),
          },
        ]}
      >
        <Trans>{title}</Trans>
      </ContentHeader>
      <ContentBody>
        <Buttons
          leftButtons={[
            <Button
              onClick={onBack}
              startIcon={<NavigateBeforeIcon />}
              variant="outlined"
            >
              <Trans>Back</Trans>
            </Button>,
          ]}
          rightButtons={
            onDelete && [
              <LoaderButton
                onClick={onDelete}
                startIcon={<DeleteIcon />}
                color="secondary"
                variant="outlined"
              >
                <Trans>Delete</Trans>
              </LoaderButton>,
            ]
          }
        />
        <BaseForm
          initialValues={object}
          onSubmit={onSubmit}
          validationSchema={yup.object({})}
        >
          <Loader status={status}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <BaseTextField name="title" label="Title" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTextField name="releaseDate" label="Release date" />
                  </Grid>
                  <Grid item xs={12}>
                    <BaseTextField name="author" label="Author" />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <SubmitButton />
              </CardActions>
            </Card>
          </Loader>
        </BaseForm>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Form;
