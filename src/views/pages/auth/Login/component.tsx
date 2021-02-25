import React, { FC, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import { StoreStatus } from 'src/state/ducks/types';
import { BaseForm } from 'src/views/base/formik/Form';
import SubmitButton from 'src/views/base/formik/SubmitButton';
import {
  BaseTextField,
  PasswordTextField,
} from 'src/views/base/formik/TextField';
import { OnSubmit } from 'src/views/base/formik/types';
import { PowerSettingsNewIcon } from 'src/views/base/material-ui/Icon';
import Loader from 'src/views/components/Loader';
import * as yup from 'yup';

interface LoginInput {
  id?: string;
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
  return (
    <Fade in timeout={1000}>
      <Container maxWidth="xs">
        <Box mt={6} mb={2} m="auto">
          <Typography component="h1" variant="h5" align="center">
            Log in
          </Typography>
        </Box>
        <Paper>
          <Loader status={status}>
            <Box p={[2, 5]} pt={[1, 1]}>
              <BaseForm
                initialValues={object}
                onSubmit={onSubmit}
                validationSchema={yup.object({
                  id: yup.string().required(),
                  password: yup.string().required(),
                  captcha: yup.string().required(),
                })}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <BaseTextField
                      name="id"
                      label="Username or email address"
                      required
                    />
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
