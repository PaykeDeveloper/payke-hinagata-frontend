import React, { useCallback, FC } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

export type FileUploadButtonProps = Omit<
  ButtonProps,
  'onClick' | 'onChange'
> & {
  id: string;
  accept?: string;
  onChange: (value?: File | null) => void | Promise<unknown>;
};

const FileUploadButton: FC<FileUploadButtonProps> = (props) => {
  const { id, accept, children, onChange, ...otherProps } = props;
  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files !== null) {
        const file = event.currentTarget.files[0];
        await onChange(file);
      } else {
        await onChange(event.currentTarget.files);
      }
    },
    [onChange]
  );
  return (
    <>
      <input
        hidden
        type="file"
        id={id}
        accept={accept}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <Button component="span" {...otherProps}>
          {children}
        </Button>
      </label>
    </>
  );
};

export default FileUploadButton;
