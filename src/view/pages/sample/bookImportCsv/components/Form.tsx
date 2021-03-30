// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { BookImportCsvInput } from 'src/store/state/domain/sample/bookImportCsvs/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseFileield } from 'src/view/base/formik/FileField';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import { NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { bookImportCsvsPath, rootPath } from 'src/view/routes/paths';
import * as yup from 'yup';

const Form: FC<{
  title: string;
  object: BookImportCsvInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;

  onSubmit: OnSubmit<BookImportCsvInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const { title, object, status, error, onSubmit, onBack } = props;
  const { t } = useTranslation();
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = ['text/csv'];
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('BookImportCsvs'), to: bookImportCsvsPath },
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
          />
          <BaseForm
            initialValues={object}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              csv_file: yup
                .mixed()
                .label(t('CsvFile'))
                .required(t('A file is required'))
                .test(
                  'fileFormat',
                  t('Unsupported Format'),
                  (value) => value && SUPPORTED_FORMATS.includes(value.type)
                )
                .test(
                  'fileSize',
                  t('File too large'),
                  (value) => value && value.size <= FILE_SIZE
                ),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <BaseFileield name="csv_file" label={t('CsvFile')} />
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
