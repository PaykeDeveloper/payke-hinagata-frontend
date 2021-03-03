import React, { FC } from 'react';
import { CheckboxProps } from '@material-ui/core';
import { FormControlProps } from '@material-ui/core/FormControl';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import MuiCheckField, {
  CheckFieldProps,
} from 'src/views/base/material-ui/CheckField';

type Props = CheckFieldProps & {
  name: string;
};

const CheckField: FC<Props> = (props) => {
  const {
    name,
    checkboxProps,
    helperText,
    formControlProps,
    ...otherProps
  } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta] = useField({ name });
  const { value, ...otherField } = field;
  const hasError = !!((meta.touched || submitCount) && meta.error);
  return (
    <MuiCheckField
      error={hasError}
      formControlProps={{
        ...formControlProps,
        disabled: formControlProps?.disabled || isSubmitting,
      }}
      checkboxProps={{ value: value ?? '', ...checkboxProps, ...otherField }}
      helperText={hasError ? meta.error : helperText}
      {...otherProps}
    />
  );
};

export default CheckField;

interface BaseCheckFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  formControlProps?: FormControlProps;
  checkboxProps?: CheckboxProps;
  nullable?: boolean;
  helperText?: string;
}

export const BaseCheckField: FC<BaseCheckFieldProps> = (props) => {
  const {
    children,
    label,
    nullable,
    disabled,
    required,
    formControlProps,
    ...otherProps
  } = props;
  const { t } = useTranslation();
  return (
    <CheckField
      label={t(label)}
      formControlProps={{ disabled, required, ...formControlProps }}
      {...otherProps}
    >
      {nullable && <option value="">{t('')}</option>}
      {children}
    </CheckField>
  );
};
BaseCheckField.defaultProps = {
  disabled: false,
  fullWidth: true,
  formControlProps: { variant: 'outlined' },
  nullable: false,
  helperText: ' ',
};
