import React, { FC, ReactNode } from 'react';
import {
  makeStyles,
  FormControl,
  FormControlProps,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  FormHelperTextProps,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label: ({ error }: { error?: boolean }) => {
    return error ? { color: theme.palette.error.main } : {};
  },
}));

export interface CheckFieldProps {
  label: ReactNode;
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
  const classes = useStyles({ error });
  return (
    <FormControl error={error} {...formControlProps}>
      <FormControlLabel
        control={<Checkbox {...checkboxProps} />}
        label={label}
        className={classes.label}
        {...formControlLabelProps}
      />
      <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CheckField;
