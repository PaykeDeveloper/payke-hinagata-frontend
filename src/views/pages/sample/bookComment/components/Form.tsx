// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import {
  BookCommentDetail,
  BookCommentInput,
} from 'src/store/state/domain/sample/bookComments/types';
import { Book } from 'src/store/state/domain/sample/books/types';
import { StoreError, StoreStatus } from 'src/store/types';
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
import Loader from 'src/views/components/atoms/Loader';
import Buttons from 'src/views/components/molecules/Buttons';
import ContentBody from 'src/views/components/molecules/ContentBody';
import ContentHeader from 'src/views/components/molecules/ContentHeader';
import ContentWrapper from 'src/views/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/views/components/molecules/ErrorWrapper';
import LoaderButton from 'src/views/components/molecules/LoaderButton';
import { booksPath, getBookPath, rootPath } from 'src/views/routes/paths';
import * as yup from 'yup';
import FooBarOptions from './FooBarOptions';

export interface FormProps {
  title: string;
  object: BookCommentInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  book: Book | undefined;
  bookComment: BookCommentDetail | undefined;

  onSubmit: OnSubmit<BookCommentInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}

const Form: FC<FormProps> = (props) => {
  const {
    title,
    object,
    status,
    error,
    book,
    bookComment,
    onSubmit,
    onBack,
    onDelete,
  } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Books'), to: booksPath },
          {
            children: book?.title,
            to: getBookPath({ bookId: `${book?.id}` }),
          },
        ]}
      >
        {t(title)}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              <Button
                onClick={onBack}
                startIcon={<NavigateBeforeIcon />}
                variant="outlined"
              >
                {t('Back')}
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
                  {t('Delete')}
                </LoaderButton>,
              ]
            }
          />
          <BaseForm
            initialValues={object}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              slug: yup.string().label(t('Slug')).required(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <DateTextField
                        name="publishDate"
                        label={t('Publish date')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTimeTextField
                        name="approvedAt"
                        label={t('Approved at')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="amount" label={t('Amount')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="column" label={t('Column')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseSelectField
                        name="choices"
                        label={t('Choices')}
                        nullable
                      >
                        <FooBarOptions />
                      </BaseSelectField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="votes" label={t('Votes')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseTextField name="slug" label={t('Slug')} required />
                    </Grid>
                    <Grid item xs={12}>
                      <MultiLineTextField
                        name="description"
                        label={t('Description')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseCheckField name="confirmed" label={t('Confirmed')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseImageField
                        name="cover"
                        label={t('Cover')}
                        defaultImage={bookComment?.coverUrl}
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
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Form;
