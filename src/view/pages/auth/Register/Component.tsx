import { FC } from 'react';
import {
  Box,
  Container,
  Fade,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { RegisterInput } from 'src/store/state/app/auth/types';
import { StoreStatus } from 'src/store/types';
import { BaseErrorField } from 'src/view/base/formik/ErrorField';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import { PasswordTextField } from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { SaveIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Logo from 'src/view/components/atoms/Logo';
import RouterLink from 'src/view/components/atoms/RouterLink';
import { loginPath } from 'src/view/routes/paths';

const StyledBox = styled(Box)({
  textAlign: 'center',
});
const StyledLogo = styled(Logo)({
  maxWidth: 200,
});

const Component: FC<{
  object?: RegisterInput;
  status: StoreStatus;

  onSubmit: OnSubmit<RegisterInput>;
}> = (props) => {
  const { object, status, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <Container maxWidth="xs">
      <StyledBox mt={2} mb={6}>
        <StyledLogo />
      </StyledBox>
      <Fade in timeout={1000}>
        <Paper>
          <Loader status={status}>
            <Box p={[2, 5]}>
              <Box mb={4}>
                <Typography component="h1" variant="h5" align="center">
                  {t('Sign up')}
                </Typography>
              </Box>
              <BaseForm
                initialValues={object}
                onSubmit={onSubmit}
                validationSchema={yup.object({
                  password: yup.string().label(t('Password')).required(),
                  passwordConfirmation: yup
                    .string()
                    .label(t('Confirm Password'))
                    .required(),
                })}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <PasswordTextField
                      name="password"
                      label={t('Password')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordTextField
                      name="passwordConfirmation"
                      label={t('Confirm Password')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <BaseErrorField name="token" />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton icon={SaveIcon} fullWidth>
                      {t('Sign up')}
                    </SubmitButton>
                  </Grid>
                </Grid>
              </BaseForm>
            </Box>
          </Loader>
        </Paper>
      </Fade>
      <Box m={1}>
        <RouterLink to={loginPath}>Back to Login</RouterLink>
      </Box>
    </Container>
  );
};

export default Component;
