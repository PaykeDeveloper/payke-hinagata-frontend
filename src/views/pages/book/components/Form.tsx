import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { Book } from 'src/state/types/domain';
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
import { booksPath, rootPath } from 'src/views/routes/paths';
import * as yup from 'yup';

export type BookInput = Partial<Book>;

export interface FormProps {
  title: string;
  object?: BookInput;
  status: StoreStatus;

  onSubmit: OnSubmit<BookInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}

const Form: FC<FormProps> = (props) => {
  const { title, object, status, onSubmit, onBack, onDelete } = props;
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: <Trans>Books</Trans>, to: booksPath },
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
          validationSchema={yup.object({
            title: yup.string().required().max(30),
            author: yup.string().nullable(),
            releaseDate: yup.date().nullable(),
          })}
        >
          <Loader status={status}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <BaseTextField name="title" label="Title" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <BaseTextField name="author" label="Author" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DateTextField name="releaseDate" label="Release date" />
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
