// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Card, Grid, MenuItem } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Trans, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Role } from 'src/store/state/domain/common/roles/types';
import { User } from 'src/store/state/domain/common/users/types';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { MemberInput } from 'src/store/state/domain/division/members/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
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
import Options from 'src/view/components/molecules/Options';
import { DivisionPath, getMembersPath, rootPath } from 'src/view/routes/paths';

const Form: FC<{
  title: string;
  object: MemberInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  users: User[];
  roles: Role[];
  divisionPath: DivisionPath;
  division: Division | undefined;
  backTo: LinkTo;
  onSubmit: OnSubmit<MemberInput>;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    status,
    error,
    disabled,
    users,
    roles,
    divisionPath,
    division,
    backTo,
    onSubmit,
    onDelete,
  } = props;
  const { t } = useTranslation();

  const userOptions = users.map((user) => ({
    value: `${user.id}`,
    display: user.name,
  }));

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: division?.name },
          {
            children: <Trans>Members</Trans>,
            to: getMembersPath(divisionPath),
          },
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
              userId: yup.string().label(t('User ID')).required().max(30),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <BaseSelectField
                        name="userId"
                        label={t('User')}
                        required
                        nullable
                        disabled={disabled}
                      >
                        <Options
                          objects={userOptions}
                          display="display"
                          value="value"
                        />
                      </BaseSelectField>
                    </Grid>
                    <Grid item xs={12} sm={8}>
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

export default Form;
