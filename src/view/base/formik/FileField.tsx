import React, { FC } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import MuFileField from 'src/view/base/material-ui/FileField';

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
}));

type Props = {
  name: string;
  defaultFile?: string | null;
  helperText?: string | null;
  disabled?: boolean | null;
};

const FileField: FC<Props> = (props) => {
  const { name, defaultFile, helperText, disabled, ...otherProps } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [, meta, helpers] = useField({ name });
  const hasError = !!((meta.touched || submitCount) && meta.error);
  return (
    <MuFileField
      name={name}
      error={hasError}
      helperText={meta.error || helperText}
      onChange={(file) => helpers.setValue(file)}
      disabled={disabled || isSubmitting}
      {...otherProps}
    />
  );
};

export default FileField;

interface BaseFileFieldProps extends Props {
  label: string;
}

export const BaseFileield: FC<BaseFileFieldProps> = (props) => {
  const { label, ...otherProps } = props;
  const classes = useStyles();
  return (
    <>
      <InputLabel htmlFor={otherProps.name} className={classes.label}>
        {label}
      </InputLabel>
      <FileField {...otherProps} />
    </>
  );
};
