// FIXME: SAMPLE CODE

import { FC } from 'react';
import { Card, CardActions, CardContent, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { DivisionInput } from 'src/store/state/domain/division/divisions/types';
import { StoreError, StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
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
import { divisionsPath, rootPath } from 'src/view/routes/paths';

const Form: FC<{
  title: string;
  object: DivisionInput | undefined;
  status: StoreStatus;
  error: StoreError | undefined;
  disabled: boolean;
  backTo: LinkTo;

  onSubmit: OnSubmit<DivisionInput>;
  onDelete?: () => Promise<unknown>;
}> = (props) => {
  const { title, object, status, error, disabled, backTo, onSubmit, onDelete } =
    props;
  const { t } = useTranslation();
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: t('Home'), to: rootPath },
          { children: t('Divisions'), to: divisionsPath },
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
              name: yup.string().label(t('Name')).required().max(30),
            })}
          >
            <Loader status={status}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                      <BaseTextField
                        name="name"
                        label={t('Name')}
                        required
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
