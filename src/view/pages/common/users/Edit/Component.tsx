import React, { FC } from 'react';
import { Card, Grid, MenuItem, CardActions, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Role } from 'src/store/state/domain/common/roles/types';
import { UserInput } from 'src/store/state/domain/common/users/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { BaseTextField } from 'src/view/base/formik/TextField';
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
import { rootPath, usersPath } from 'src/view/routes/paths';

const Component: FC<{
  title: string;
  object: UserInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  roles: Role[];
  backTo: LinkTo;
  onSubmit: OnSubmit<UserInput>;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    status,
    error,
    disabled,
    roles,
    backTo,
    onSubmit,
    onDelete,
  } = props;
  const { t } = useTranslation();

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Users'), to: usersPath },
        ]}
      >
        {t(title)}
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
              name: yup.string().label(t('Name')).required().max(255),
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
                      <BaseMultiSelectField
                        name="roleNames"
                        label={t('Role')}
                        required
                        disabled={disabled}
                      >
                        {roles.map(({ id, name }) => (
                          <MenuItem key={id} value={name}>
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
