// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { BaseTextField, DateTextField } from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { DeleteIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import { booksPath, rootPath } from 'src/view/routes/paths';
import * as yup from 'yup';

const Form: FC<{
  title: string;
  object: BookInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;

  onSubmit: OnSubmit<BookInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const { title, object, status, error, onSubmit, onBack, onDelete } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Books'), to: booksPath },
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
              title: yup.string().label(t('Title')).required().max(30),
              author: yup.string().label(t('Author')).nullable(),
              releaseDate: yup.date().label(t('Release date')).nullable(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <BaseTextField name="title" label={t('Title')} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTextField
                        name="releaseDate"
                        label={t('Release date')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BaseTextField name="author" label={t('Author')} />
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