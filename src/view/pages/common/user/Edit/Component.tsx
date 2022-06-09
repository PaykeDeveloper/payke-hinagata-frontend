import React, { FC } from 'react';
import { Card, Grid, CardActions, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { DomainLocale } from 'src/store/state/domain/common/locales/types';
import { MyUserInput } from 'src/store/state/domain/common/user/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import Loader from 'src/view/components/atoms/Loader';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import Options from 'src/view/components/molecules/Options';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  object: MyUserInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  locales: DomainLocale[];

  onSubmit: OnSubmit<MyUserInput>;
}> = (props) => {
  const { object, status, error, locales, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <ContentWrapper>
      <ContentHeader links={[{ children: t('Home'), to: rootPath }]}>
        {t('Setting')}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <BaseForm
            initialValues={object}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              locale: yup.string().label(t('Locale')).required(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <BaseSelectField
                        name="locale"
                        label={t('Locale')}
                        required
                      >
                        <option />
                        <Options
                          objects={locales}
                          display="label"
                          value="value"
                        />
                      </BaseSelectField>
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

export default Component;
