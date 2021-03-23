import React, { FC, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Trans, useTranslation } from 'react-i18next';
import { LoginInput } from 'src/store/state/app/auth/types';
import { StoreStatus } from 'src/store/types';
import { BaseForm } from 'src/view/base/formik/Form';
import SubmitButton from 'src/view/base/formik/SubmitButton';
import {
  EmailTextField,
  PasswordTextField,
} from 'src/view/base/formik/TextField';
import { OnSubmit } from 'src/view/base/formik/types';
import { PowerSettingsNewIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Logo from 'src/view/components/atoms/Logo';
import * as yup from 'yup';

const useStyles = makeStyles({
  logoBox: {
    textAlign: 'center',
  },
  logo: {
    maxWidth: 200,
  },
});

const Component: FC<{
  object?: LoginInput;
  isAuthenticated: boolean;
  status: StoreStatus;

  onSubmit: OnSubmit<LoginInput>;
  onLoggedIn: () => void;
}> = (props) => {
  const { object, isAuthenticated, status, onSubmit, onLoggedIn } = props;
  useEffect(() => {
    if (isAuthenticated) {
      onLoggedIn();
    }
  }, [onLoggedIn, isAuthenticated]);
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="xs">
        <Box mt={2} mb={6} className={classes.logoBox}>
          <Logo className={classes.logo} />
        </Box>
        <Paper>
          <Loader status={status}>
            <Box p={[2, 5]}>
              <Box mb={4}>
                <Typography component="h1" variant="h5" align="center">
                  <Trans>Log in</Trans>
                </Typography>
              </Box>
              <BaseForm
                initialValues={object}
                onSubmit={onSubmit}
                validationSchema={yup.object({
                  email: yup.string().label(t('Email')).required(),
                  password: yup.string().label(t('Password')).required(),
                })}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <EmailTextField name="email" label={t('Email')} required />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordTextField
                      name="password"
                      label={t('Password')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton icon={PowerSettingsNewIcon} fullWidth>
                      <Trans>Log in</Trans>
                    </SubmitButton>
                  </Grid>
                </Grid>
              </BaseForm>
            </Box>
          </Loader>
        </Paper>
      </Container>
    </Fade>
  );
};

export default Component;
