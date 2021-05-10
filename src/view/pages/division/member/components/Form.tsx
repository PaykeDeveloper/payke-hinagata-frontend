import React, { FC } from 'react';
import { Button, Card, Grid, MenuItem } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Trans, useTranslation } from 'react-i18next';
import { Role } from 'src/store/state/domain/common/roles/types';
import { Division } from 'src/store/state/domain/division/divisions/types';
import {
  MemberDetail,
  MemberInput,
  MemberUserDetail,
} from 'src/store/state/domain/division/members/types';
import { BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseMultiSelectField } from 'src/view/base/formik/MultiSelectField';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { OnSubmit } from 'src/view/base/formik/types';
import { DeleteIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import Options from 'src/view/components/molecules/Options';
import {
  divisionsPath,
  getMembersPath,
  getDivisionPath,
  rootPath,
} from 'src/view/routes/paths';
import * as yup from 'yup';

export type PermissionList = {
  memberDelete: boolean;
};

const Form: FC<{
  title: string;
  object: MemberInput | undefined;
  statuses: StoreStatus[];
  errors: (StoreError | undefined)[];
  permission?: PermissionList;
  division: Division | undefined;
  memberUsers: MemberUserDetail[];
  member: MemberDetail | undefined;
  memberRoles: Role[];

  onSubmit: OnSubmit<BookInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    memberUsers,
    statuses,
    errors,
    permission,
    memberRoles: roles,
    division,
    onSubmit,
    onBack,
    onDelete,
  } = props;
  const { t } = useTranslation();

  const userOptions = memberUsers.map((member) => ({
    value: `${member.userId}`,
    display: t(member.name || `${member.userId}`),
  }));

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Divisions'), to: divisionsPath },
          {
            children: division?.name,
            to: getDivisionPath({ divisionId: `${division?.id}` }),
          },
          {
            children: <Trans>Members</Trans>,
            to: getMembersPath({ divisionId: `${division?.id}` }),
          },
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
              onDelete && [
                <LoaderButton
                  disabled={!permission?.memberDelete}
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
            <Loader statuses={statuses}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <BaseSelectField
                        name="userId"
                        label={t('User')}
                        required
                        nullable
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