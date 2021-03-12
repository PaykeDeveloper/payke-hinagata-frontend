import React, { FC, ReactNode, useEffect } from 'react';

import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText, {
  FormHelperTextProps,
} from '@material-ui/core/FormHelperText';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select, { SelectProps } from '@material-ui/core/Select';

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
  const [labelWidth, setLabelWidth] = React.useState<number>();
  let input;
  if (formControlProps?.variant === 'outlined') {
    input = <OutlinedInput labelWidth={labelWidth} />;
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
