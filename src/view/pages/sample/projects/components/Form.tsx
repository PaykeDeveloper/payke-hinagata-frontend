// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Division } from 'src/store/state/domain/division/divisions/types';
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
import PriorityOptions from './PriorityOptions';

const Form: FC<{
  title: string;
  object: ProjectInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  divisionPath: DivisionPath;
  project: Project | undefined;
  division: Division | undefined;

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
    division,
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
          { children: division?.name },
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
                    <Grid item xs={12} sm={6}>
                      <BaseTextField
                        name="name"
                        label={t('Name')}
                        required
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseSelectField
                        name="priority"
                        label={t('Priority')}
                        nullable
                        disabled={disabled}
                      >
                        <PriorityOptions />
                      </BaseSelectField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseCheckField
                        name="approved"
                        label={t('Approved')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTextField
                        name="startDate"
                        label={t('Start date')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DateTimeTextField
                        name="finishedAt"
                        label={t('Finished at')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField
                        name="difficulty"
                        label={t('Difficulty')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField
                        name="coefficient"
                        label={t('Coefficient')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <NumberTextField
                        name="productivity"
                        label={t('Productivity')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MultiLineTextField
                        name="description"
                        label={t('Description')}
                        disabled={disabled}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <BaseImageField
                        name="cover"
                        label={t('Cover')}
                        defaultImage={project?.coverUrl}
                        maxWidth={150}
                        height={150}
                        disabled={disabled}
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
