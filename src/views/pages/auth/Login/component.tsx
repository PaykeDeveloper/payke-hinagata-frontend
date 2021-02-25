import React, { FC, useEffect } from 'react';

import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/types/base';
import { BaseForm } from 'src/views/base/formik/Form';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import {
  EmailTextField,
  PasswordTextField,
} from 'src/views/base/formik/TextField';
import { OnSubmit } from 'src/views/base/formik/types';
import { PowerSettingsNewIcon } from 'src/views/base/material-ui/Icon';
import Loader from 'src/views/components/Loader';
import Logo from 'src/views/components/Logo';
import * as yup from 'yup';

const useStyles = makeStyles({
  logoBox: {
    textAlign: 'center',
  },
  logo: {
    maxWidth: 200,
  },
});

interface LoginInput {
  email?: string;
  password?: string;
}

export interface LoginProps {
  object?: LoginInput;
  isAuthenticated: boolean;
  status: StoreStatus;

  onSubmit: OnSubmit<LoginInput>;
  onLoggedIn: () => void;
}

const Login: FC<LoginProps> = (props) => {
  const { object, isAuthenticated, status, onSubmit, onLoggedIn } = props;
  useEffect(() => {
    if (isAuthenticated) {
      onLoggedIn();
    }
  }, [onLoggedIn, isAuthenticated]);
  const classes = useStyles();
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
                  email: yup.string().required(),
                  password: yup.string().required(),
                })}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <EmailTextField name="email" label="Email" required />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordTextField
                      name="password"
                      label="Password"
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

export default Login;
