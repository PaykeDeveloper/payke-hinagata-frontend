import React, { FC } from 'react';

import { InputLabelProps } from '@material-ui/core/InputLabel';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

type Props = TextFieldProps & {
  name: string;
  label: string;
};

const TextField: FC<Props> = (props) => {
  const { name, disabled, helperText, value: _, ...otherProps } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta] = useField({ name });
  const { value, ...otherField } = field;
  const hasError = !!((meta.touched || submitCount) && meta.error);
  return (
    <MuiTextField
      disabled={disabled || isSubmitting}
      error={hasError}
      helperText={hasError ? meta.error : helperText}
      value={value ?? ''}
      {...otherProps}
      {...otherField}
    />
  );
};

export default TextField;

interface BaseTextFieldProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  multiline?: boolean;
  InputLabelProps?: InputLabelProps;
  helperText?: string;
}

export const BaseTextField: FC<BaseTextFieldProps> = (props) => {
  const { label, ...otherProps } = props;
  const { t } = useTranslation();
  return (
    <TextField
      variant="outlined"
      label={t(label)}
      placeholder={t(label)}
      {...otherProps}
    />
  );
};
BaseTextField.defaultProps = {
  fullWidth: true,
  helperText: ' ',
};

export const MultiLineTextField: FC<BaseTextFieldProps> = (props) => (
  <BaseTextField {...props} />
);
MultiLineTextField.defaultProps = {
  multiline: true,
};

export const NumberTextField: FC<BaseTextFieldProps> = (props) => (
  <BaseTextField {...props} />
);
NumberTextField.defaultProps = {
  type: 'number',
};

export const DateTextField: FC<BaseTextFieldProps> = (props) => (
  <BaseTextField {...props} />
);
DateTextField.defaultProps = {
  type: 'date',
  InputLabelProps: { shrink: true },
};

export const EmailTextField: FC<BaseTextFieldProps> = (props) => (
  <BaseTextField {...props} />
);
EmailTextField.defaultProps = {
  type: 'email',
};

export const PasswordTextField: FC<BaseTextFieldProps> = (props) => (
  <BaseTextField {...props} />
);
PasswordTextField.defaultProps = {
  type: 'password',
};
