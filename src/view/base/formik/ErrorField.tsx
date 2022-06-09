import React, { FC } from 'react';
import { Alert, AlertProps, Box, BoxProps } from '@mui/material';
import { useField } from 'formik';

interface Props {
  name: string;
  boxProps?: BoxProps;
  alertProps?: AlertProps;
}

const ErrorField: FC<Props> = (props) => {
  const { name, boxProps, alertProps } = props;
  const [, meta] = useField({ name });
  const { error } = meta;

  if (!error) {
    return null;
  }

  return (
    <Box {...boxProps}>
      <Alert severity="error" {...alertProps}>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorField;

interface BaseErrorFieldProps {
  name: string;
  boxProps?: BoxProps;
  alertProps?: AlertProps;
}

export const BaseErrorField: FC<BaseErrorFieldProps> = (props) => {
  const { name, ...otherProps } = props;
  return <ErrorField name={name} {...otherProps} />;
};
