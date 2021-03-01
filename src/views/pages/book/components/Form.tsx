import React, { FC } from 'react';
import { Box, Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { Book } from 'src/state/types/domain';
import { BaseForm } from 'src/views/base/formik/Form';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import { BaseTextField, DateTextField } from 'src/views/base/formik/TextField';
import { OnSubmit } from 'src/views/base/formik/types';
import ContentBody from 'src/views/components/ContentBody';
import ContentHeader from 'src/views/components/ContentHeader';
import ContentWrapper from 'src/views/components/ContentWrapper';
import Loader from 'src/views/components/Loader';
import { booksPath, rootPath } from 'src/views/routes/paths';
import * as yup from 'yup';

export type BookInput = Partial<Book>;

export interface FormProps {
  title: string;
  object?: BookInput;
  status: StoreStatus;

  onSubmit: OnSubmit<BookInput>;
  onDelete?: () => void;
}

const Form: FC<FormProps> = (props) => {
  const { title, object, status, onSubmit, onDelete } = props;
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
        {onDelete && (
          <Box mb={1}>
            <Button color="secondary" variant="outlined" onClick={onDelete}>
              <Trans>Delete</Trans>
            </Button>
          </Box>
        )}
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
