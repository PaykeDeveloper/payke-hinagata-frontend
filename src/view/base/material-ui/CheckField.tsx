import { FC, ReactNode } from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  styled,
} from '@mui/material';

const StyledFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (propName) => propName !== 'error',
})<{ error?: boolean }>(({ theme, error }) =>
  error ? { color: theme.palette.error.main } : {}
);

export interface CheckFieldProps {
  label: FormControlLabelProps['label'];
  error?: boolean;
  helperText?: ReactNode;
  checkboxProps?: CheckboxProps;
  formControlProps?: FormControlProps;
  formControlLabelProps?: FormControlLabelProps;
  formHelperTextProps?: FormHelperTextProps;
}

const CheckField: FC<CheckFieldProps> = (props) => {
  const {
    label,
    error,
    helperText,
    checkboxProps,
    formControlProps,
    formControlLabelProps,
    formHelperTextProps,
  } = props;
  return (
    <FormControl error={error} {...formControlProps}>
      <StyledFormControlLabel
        control={<Checkbox {...checkboxProps} />}
        label={label}
        error={error}
        {...formControlLabelProps}
      />
      <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CheckField;
