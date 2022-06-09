import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = Omit<TextFieldProps, 'select'> & {
  name: string;
};

const SelectField: FC<Props> = (props) => {
  const { name, disabled, helperText, value: _, ...otherProps } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta] = useField({ name });
  const { value, ...otherField } = field;
  const hasError = !!((meta.touched || submitCount) && meta.error);
  return (
    <TextField
      select
      disabled={disabled || isSubmitting}
      error={hasError}
      helperText={hasError ? meta.error : helperText}
      value={value ?? ''}
      {...otherProps}
      {...otherField}
    />
  );
};

export default SelectField;

interface BaseSelectFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  SelectProps?: TextFieldProps['SelectProps'];
  nullable?: boolean;
  helperText?: string;
}

export const BaseSelectField: FC<BaseSelectFieldProps> = (props) => {
  const { children, nullable, ...otherProps } = props;
  return (
    <SelectField {...otherProps}>
      {nullable && <option value="" />}
      {children}
    </SelectField>
  );
};
BaseSelectField.defaultProps = {
  disabled: false,
  fullWidth: true,
  SelectProps: { native: true },
  nullable: false,
  helperText: ' ',
};
