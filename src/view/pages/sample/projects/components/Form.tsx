// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import {
  Project,
  ProjectInput,
} from 'src/store/state/domain/sample/projects/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseCheckField } from 'src/view/base/formik/CheckField';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseImageField } from 'src/view/base/formik/ImageField';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import {
  BaseTextField,
  DateTextField,
  DateTimeTextField,
  MultiLineTextField,
  NumberTextField,
} from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { DeleteIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import LoaderButton from 'src/view/components/molecules/LoaderButton';
import { DivisionPath, getProjectsPath, rootPath } from 'src/view/routes/paths';
import * as yup from 'yup';
import PriorityOptions from './PriorityOptions';

const Form: FC<{
  title: string;
  object: ProjectInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  divisionPath: DivisionPath;
  project: Project | undefined;

  onSubmit: OnSubmit<ProjectInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    status,
    error,
    disabled,
    divisionPath,
    project,
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
          {
            children: t('Projects'),
            to: getProjectsPath(divisionPath),
          },
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
              name: yup.string().label(t('Name')).required(),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <BaseTextField
                        name="name"
                        label={t('Name')}
                        required
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTextField
                        name="publishDate"
                        label={t('Publish date')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTimeTextField
                        name="approvedAt"
                        label={t('Approved at')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="amount" label={t('Amount')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="column" label={t('Column')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseSelectField
                        name="choices"
                        label={t('Choices')}
                        nullable
                      >
                        <PriorityOptions />
                      </BaseSelectField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField name="votes" label={t('Votes')} />
                    </Grid>
                    <Grid item xs={12}>
                      <MultiLineTextField
                        name="description"
                        label={t('Description')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseCheckField name="confirmed" label={t('Confirmed')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseImageField
                        name="cover"
                        label={t('Cover')}
                        defaultImage={project?.coverUrl}
                        maxWidth={150}
                        height={150}
                      />
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
