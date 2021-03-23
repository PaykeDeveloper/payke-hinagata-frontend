import React, { FC } from 'react';

import { FormControlProps } from '@material-ui/core/FormControl';
import { SelectProps } from '@material-ui/core/Select';
import { useField, useFormikContext } from 'formik';
import MuiSelectField, {
  SelectFieldProps,
} from 'src/view/base/material-ui/SelectField';

type Props = SelectFieldProps & {
  name: string;
};

const SelectField: FC<Props> = (props) => {
  const {
    name,
    selectProps,
    helperText,
    formControlProps,
    ...otherProps
  } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta] = useField({ name });
  const { value, ...otherField } = field;
  const hasError = !!((meta.touched || submitCount) && meta.error);
  return (
    <MuiSelectField
      error={hasError}
      formControlProps={{
        ...formControlProps,
        disabled: formControlProps?.disabled || isSubmitting,
      }}
      selectProps={{ value: value ?? '', ...selectProps, ...otherField }}
      helperText={hasError ? meta.error : helperText}
      {...otherProps}
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
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  nullable?: boolean;
  helperText?: string;
}

export const BaseSelectField: FC<BaseSelectFieldProps> = (props) => {
  const {
    children,
    label,
    nullable,
    disabled,
    required,
    formControlProps,
    ...otherProps
  } = props;
  return (
    <SelectField
      label={label}
      formControlProps={{ disabled, required, ...formControlProps }}
      {...otherProps}
    >
      {nullable && <option value="" />}
      {children}
    </SelectField>
  );
};
BaseSelectField.defaultProps = {
  disabled: false,
  fullWidth: true,
  formControlProps: { variant: 'outlined' },
  selectProps: { native: true },
  nullable: false,
  helperText: ' ',
};
