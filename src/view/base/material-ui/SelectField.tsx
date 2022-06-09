import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  OutlinedInput,
  Select,
  SelectProps,
} from '@mui/material';

export interface SelectFieldProps {
  label: ReactNode;
  // name: string;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: ReactNode;
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  selectProps?: SelectProps;
  formHelperTextProps?: FormHelperTextProps;
}

const SelectField: FC<SelectFieldProps> = (props) => {
  const {
    children,
    label,
    error,
    fullWidth,
    helperText,
    formControlProps,
    inputLabelProps,
    selectProps,
    formHelperTextProps,
  } = props;
  // const classes = useStyles();
  const inputLabel = useRef<HTMLLabelElement>(null);
  const [, setLabelWidth] = useState<number>();
  let input;
  if (formControlProps?.variant === 'outlined') {
    input = <OutlinedInput label={label} />;
  }

  useEffect(() => {
    const offsetWidth = inputLabel.current?.offsetWidth;
    if (offsetWidth) {
      setLabelWidth(offsetWidth);
    }
  }, []);
  return (
    <FormControl error={error} fullWidth={fullWidth} {...formControlProps}>
      <InputLabel ref={inputLabel} {...inputLabelProps}>
        {label}
      </InputLabel>
      <Select fullWidth={fullWidth} input={input} {...selectProps}>
        {children}
      </Select>
      {helperText && (
        <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectField;
