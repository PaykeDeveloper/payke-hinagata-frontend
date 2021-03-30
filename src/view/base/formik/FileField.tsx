import React, { FC, ReactNode, useCallback } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';

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

export type FileFieldProps = {
  name?: string;
  helperText?: ReactNode;
  error?: boolean;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

const MuFileField: FC<FileFieldProps> = (props) => {
  const { name, helperText, error, onChange: callOnChange } = props;
  return (
    <>
      <input
        id={name}
        name={name}
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          callOnChange(event?.currentTarget?.files?.item(0) ?? null);
        }}
      />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

const FileField: FC<Props> = (props) => {
  const { name, defaultFile, helperText, disabled, ...otherProps } = props;
  const { isSubmitting, submitCount } = useFormikContext();
  const [field, meta, helpers] = useField({ name });
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
