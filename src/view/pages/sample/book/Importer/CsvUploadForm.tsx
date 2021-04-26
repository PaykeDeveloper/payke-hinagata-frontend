import React, { FC } from 'react';
import { Box, Card, CardContent, CardActions } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StoreError } from 'src/store/types';
import { BaseFileField } from 'src/view/base/formik/FileField';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import * as yup from 'yup';

export const MAX_FILE_SIZE = 1024 * 1024;
export const SUPPORTED_FORMATS = ['text/csv'];

export const CsvUploadForm: FC<{
  error: StoreError | undefined;
  onSubmit: OnSubmit<{ csv_file: File }>;
}> = (props) => {
  console.log('render CsvUploadForm!!');
  const { error, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <ErrorWrapper error={error}>
      <Box mt={3}>
        <BaseForm
          initialValues={undefined}
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
                (value) => value && value.size <= MAX_FILE_SIZE
              ),
          })}
        >
          <Card>
            <CardContent>
              <BaseFileField name="csv_file" label={t('CsvFile')} />
            </CardContent>
            <CardActions>
              <SubmitButton>{t('Parse CSV')}</SubmitButton>
            </CardActions>
          </Card>
        </BaseForm>
      </Box>
    </ErrorWrapper>
  );
};
