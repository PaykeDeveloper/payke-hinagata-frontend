import React, { FC, ReactNode, useEffect } from 'react';

import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectProps } from '@mui/material/Select';

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
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [, setLabelWidth] = React.useState<number>();
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
