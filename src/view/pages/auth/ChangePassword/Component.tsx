import { FC } from 'react';
import { Card, Grid, CardActions, CardContent } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { ChangePasswordInput } from 'src/store/state/app/auth/types';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { PasswordTextField } from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import { rootPath } from 'src/view/routes/paths';

const Component: FC<{
  object: ChangePasswordInput | undefined;
  onSubmit: OnSubmit<ChangePasswordInput>;
}> = (props) => {
  const { object, onSubmit } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader links={[{ children: <Trans>Home</Trans>, to: rootPath }]}>
        {t('Change password')}
      </ContentHeader>
      <ContentBody>
        <BaseForm
          initialValues={object}
          onSubmit={onSubmit}
          validationSchema={yup.object({
            currentPassword: yup
              .string()
              .label(t('Current password'))
              .required(),
            password: yup.string().label(t('New password')).required(),
            passwordConfirmation: yup
              .string()
              .label(t('Confirm Password'))
              .required(),
          })}
        >
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <PasswordTextField
                    name="currentPassword"
                    label={t('Current password')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordTextField
                    name="password"
                    label={t('New password')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <PasswordTextField
                    name="passwordConfirmation"
                    label={t('Confirm Password')}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <SubmitButton />
            </CardActions>
          </Card>
        </BaseForm>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
