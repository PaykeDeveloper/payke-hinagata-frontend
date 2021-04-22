import React, { FC } from 'react';
import { Button, Card, Grid, MenuItem } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { InvitationCreateInput } from 'src/store/state/domain/common/invitations/types';
import { Role } from 'src/store/state/domain/common/roles/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { BaseTextField, EmailTextField } from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { invitationsPath, rootPath } from 'src/view/routes/paths';
import * as yup from 'yup';
import LocaleOptions from '../components/LocaleOptions';

const Component: FC<{
  object: InvitationCreateInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  roles: Role[];

  onSubmit: OnSubmit<InvitationCreateInput>;
  onBack: () => void;
}> = (props) => {
  const { object, status, error, roles, onSubmit, onBack } = props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Invitations'), to: invitationsPath },
        ]}
      >
        {t('Add invitation')}
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
              name: yup.string().label(t('Name')).required(),
              email: yup.string().label(t('Email')).required().email(),
              locale: yup.string().label(t('Locale')).required(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <BaseTextField name="name" label={t('Name')} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <EmailTextField
                        name="email"
                        label={t('Email')}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseSelectField
                        name="locale"
                        label={t('Locale')}
                        required
                      >
                        <LocaleOptions />
                      </BaseSelectField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseMultiSelectField
                        name="roleNames"
                        label={t('Role')}
                        required
                      >
                        {roles.map(({ id, name, required }) => (
                          <MenuItem key={id} value={name} disabled={required}>
                            {t(name)}
                          </MenuItem>
                        ))}
                      </BaseMultiSelectField>
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
