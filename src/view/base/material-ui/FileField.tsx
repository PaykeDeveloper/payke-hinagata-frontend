import React, { FC, ReactNode } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export type FileFieldProps = {
  name?: string;
  helperText?: ReactNode;
  error?: boolean;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

const FileField: FC<FileFieldProps> = (props) => {
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

export default FileField;
