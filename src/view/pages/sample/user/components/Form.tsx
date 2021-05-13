import React, { FC } from 'react';
import { Button, Card, Grid, MenuItem } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import { Role } from 'src/store/state/domain/common/roles/types';
import { UserInput } from 'src/store/state/domain/common/users/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { BaseTextField } from 'src/view/base/formik/TextField';
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

export type PermissionList = {
  userUpdate: boolean;
  userDelete: boolean;
};

const Form: FC<{
  title: string;
  object: UserInput | undefined;
  statuses: StoreStatus[];
  errors: (StoreError | undefined)[];
  userRoles: Role[];
  permission?: PermissionList;

  onSubmit: OnSubmit<UserInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    statuses,
    errors,
    userRoles: roles,
    permission,
    onSubmit,
    onBack,
    onDelete,
  } = props;
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
        <ErrorWrapper errors={errors}>
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
              permission?.userDelete
                ? onDelete && [
                    <LoaderButton
                      onClick={onDelete}
                      startIcon={<DeleteIcon />}
                      color="secondary"
                      variant="outlined"
                    >
                      {t('Delete')}
                    </LoaderButton>,
                  ]
                : undefined
            }
          />
          <BaseForm
            initialValues={object}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              name: yup.string().label(t('Name')).required().max(255),
            })}
          >
            <Loader statuses={statuses}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <BaseTextField name="name" label={t('Name')} required />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <BaseMultiSelectField
                        name="roleNames"
                        label={t('Role')}
                        required
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
