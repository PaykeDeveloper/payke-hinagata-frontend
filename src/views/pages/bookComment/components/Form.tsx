import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Trans } from 'react-i18next';
import { BookCommentInput } from 'src/state/ducks/domain/bookComments/types';
import { Book } from 'src/state/ducks/domain/books/types';
import { StoreStatus } from 'src/state/types/base';
import { BaseCheckField } from 'src/views/base/formik/CheckField';
import { BaseForm } from 'src/views/base/formik/Form';
import { BaseImageField } from 'src/views/base/formik/ImageField';
import { BaseSelectField } from 'src/views/base/formik/SelectField';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import {
  BaseTextField,
  DateTextField,
  DateTimeTextField,
  MultiLineTextField,
  NumberTextField,
} from 'src/views/base/formik/TextField';
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
import FooBarOptions from 'src/views/pages/bookComment/components/FooBarOptions';
import { booksPath, getBookPath, rootPath } from 'src/views/routes/paths';
import * as yup from 'yup';

export interface FormProps {
  title: string;
  object: BookCommentInput | undefined;
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
                    <DateTextField name="publishDate" label="Publish date" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTimeTextField name="approvedAt" label="Approved at" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberTextField name="amount" label="Amount" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberTextField name="column" label="column" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BaseSelectField name="choices" label="Choices" nullable>
                      <FooBarOptions />
                    </BaseSelectField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberTextField name="votes" label="Votes" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BaseTextField name="slug" label="Slug" />
                  </Grid>
                  <Grid item xs={12}>
                    <MultiLineTextField
                      name="description"
                      label="Description"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BaseCheckField name="confirmed" label="Confirmed" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BaseImageField
                      name="cover"
                      label="Cover"
                      maxWidth={150}
                      height={150}
                    />
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
