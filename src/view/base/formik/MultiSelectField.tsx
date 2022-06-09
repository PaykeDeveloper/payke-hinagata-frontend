import React, { FC } from 'react';

import { SelectProps, MenuItem, FormControlProps } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import MuiSelectField, {
  SelectFieldProps,
} from 'src/view/base/material-ui/SelectField';

type Props = SelectFieldProps & {
  name: string;
};

const MultiSelectField: FC<Props> = (props) => {
  const { name, selectProps, helperText, formControlProps, ...otherProps } =
    props;
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
      selectProps={{
        multiple: true,
        value: value ?? [],
        ...selectProps,
        ...otherField,
      }}
      helperText={hasError ? meta.error : helperText}
      {...otherProps}
    />
  );
};

export default MultiSelectField;

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

export const BaseMultiSelectField: FC<BaseSelectFieldProps> = (props) => {
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
    <MultiSelectField
      label={label}
      formControlProps={{ disabled, required, ...formControlProps }}
      {...otherProps}
    >
      {nullable && <MenuItem value="" />}
      {children}
    </MultiSelectField>
  );
};
BaseMultiSelectField.defaultProps = {
  disabled: false,
  fullWidth: true,
  formControlProps: { variant: 'outlined' },
  nullable: false,
  helperText: ' ',
};
