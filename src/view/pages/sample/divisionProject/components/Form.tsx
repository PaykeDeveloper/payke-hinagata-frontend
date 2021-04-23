// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Button, Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import {
  DivisionProjectDetail,
  DivisionProjectInput,
} from 'src/store/state/domain/sample/divisionProjects/types';
import { Division } from 'src/store/state/domain/sample/divisions/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
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
import {
  divisionsPath,
  getDivisionPath,
  getDivisionProjectsPath,
  rootPath,
} from 'src/view/routes/paths';
import * as yup from 'yup';

const Form: FC<{
  title: string;
  object: DivisionProjectInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  division: Division | undefined;
  divisionProject: DivisionProjectDetail | undefined;

  onSubmit: OnSubmit<DivisionProjectInput>;
  onBack: () => void;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const {
    title,
    object,
    status,
    error,
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
          { children: t('Divisions'), to: divisionsPath },
          {
            children: division?.name,
            to: getDivisionPath({ divisionId: `${division?.id}` }),
          },
          {
            children: t('Projects'),
            to: getDivisionProjectsPath({ divisionId: `${division?.id}` }),
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
                      <BaseTextField name="name" label={t('Name')} required />
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
