import { FC } from 'react';
import { FormControlProps, MenuItem, SelectProps } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import MuiSelectField, {
  SelectFieldProps,
} from 'src/view/base/material-ui/SelectField';
import { WithChildren } from 'src/view/base/types';

type Props = SelectFieldProps &
  WithChildren & {
    name: string;
  };

const MultiSelectField: FC<Props> = (props) => {
  const {
    name,
    selectProps,
    helperText,
    formControlProps,
    children,
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
      selectProps={{
        multiple: true,
        value: value ?? [],
        ...selectProps,
        ...otherField,
      }}
      helperText={hasError ? meta.error : helperText}
      {...otherProps}
    >
      {children}
    </MuiSelectField>
  );
};

export default MultiSelectField;

interface BaseSelectFieldProps extends WithChildren {
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
