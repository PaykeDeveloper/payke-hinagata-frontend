import { FC } from 'react';
import { Card, Grid, MenuItem, CardActions, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { InvitationUpdateInput } from 'src/store/state/domain/common/invitations/types';
import { Role } from 'src/store/state/domain/common/roles/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { BaseTextField, EmailTextField } from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { DeleteIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import { LinkTo } from 'src/view/base/react-router/types';
import LinkButton from 'src/view/components/atoms/LinkButton';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import { invitationsPath, rootPath } from 'src/view/routes/paths';

const Component: FC<{
  object: InvitationUpdateInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  roles: Role[];
  backTo: LinkTo;
  onSubmit: OnSubmit<InvitationUpdateInput>;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const { object, status, error, disabled, roles, backTo, onSubmit, onDelete } =
    props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Invitations'), to: invitationsPath },
        ]}
      >
        {t('Edit invitation')}
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <Buttons
            leftButtons={[
              <LinkButton
                to={backTo}
                startIcon={<NavigateBeforeIcon />}
                variant="outlined"
              >
                {t('Back')}
              </LinkButton>,
            ]}
            rightButtons={[
              onDelete ? (
                <LoaderButton
                  onClick={onDelete}
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  variant="outlined"
                >
                  {t('Delete')}
                </LoaderButton>
              ) : undefined,
            ]}
          />
          <BaseForm
            initialValues={object}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              name: yup.string().label(t('Name')).required(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <BaseTextField
                        name="name"
                        label={t('Name')}
                        required
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <EmailTextField
                        name="email"
                        label={t('Email')}
                        disabled={true}
                      />
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
                  <SubmitButton disabled={disabled} />
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
